
function is_dict(object){
	return Object.prototype.isPrototypeOf(object) && !Array.prototype.isPrototypeOf(object);
}

function is_array(object){
	return Array.prototype.isPrototypeOf(object);
}

function editable_anchor(id, text){
	var anchor = document.createElement('a');
	anchor.setAttribute('id', id);
	anchor.setAttribute('href', '');
	anchor.setAttribute('data-type', 'text');
	anchor.setAttribute('data-pk', '1');
	anchor.setAttribute('data-original-title', 'Enter data');
	anchor.setAttribute('class','editable editable-click');
	anchor.setAttribute('style', 'display: inline; background-color: rgba(0, 0, 0, 0);');
	anchor.innerText = text;
	return anchor
}

function to_table(id, data){

	// INIT ELEMENT VARIABLES
	var div = document.createElement('div');
	var table = document.createElement('table');
	var thead = document.createElement('thead');
	var tbody = document.createElement('tbody');
	var thead_tr = document.createElement('tr');
	var body_tr = document.createElement('tr');
	var field;
	var field_id;
	var thead_td;
	var body_td;
	var anchor;
	var bold;
	var obj
	id = id.toString().replace(/\./g,'-'); 

	// BUILD TABLE INNER ELEMENTS
	for (field in data){
		if (is_dict(data[field])) continue;

		// THEAD 
		thead_td = document.createElement('td');
		bold = document.createElement('b');
		bold.innerText = field;
		thead_td.appendChild(bold);
		thead_tr.appendChild(thead_td);

		// BODY
		field_id = id + '-' + field;
		anchor = editable_anchor(field_id, data[field])
		body_td = document.createElement('td');
		body_td.appendChild(anchor);
		body_tr.appendChild(body_td);

		// PATH:VALUE OBJECT 
		REGISTRY.push(field_id)
	}

	//APPEND TABLE CHILD ELEMENTS
	div.setAttribute('style', 'overflow:auto');
	table.setAttribute('id', id);
	table.setAttribute('class', 'table table-condensed table-hover');
	thead.appendChild(thead_tr);
	tbody.appendChild(body_tr);
	table.appendChild(thead);
	table.appendChild(tbody);
	div.appendChild(table);

	return div
}


function Field(level, path, name, value){

	// MAKE SOME MAGIC
	var split = path.split('.');
	var index = split.indexOf(name) - 1;

	// CONSTRUCT OBJECTS
	this.parent = split[index];
	this.level = level;
	this.path = path;
	this.name = name;
	this.value = value;
	this.has_children = is_dict(value) || is_array(value);

	this.is_multivalued = function(){
		if (is_array(this.value)){
			if (typeof this.value[0] == 'string'){
				return 'single';
			}	
			if (typeof this.value[0] == 'object'){
				return 'compound';
			}	
		}
		return false;
	}
}


function log(msg){
	console.log(msg);
}


function RegistryView(id, data){

	this.id = id
	this.data = data
	this.accordion = new Accordion(id);
	this.root = id || '__root__';

	this.get_overview = function(){

		this.overview = new Array();
		var LEVEL = 0;
		var path;
		var field_name;
		var field;

		if (!is_array(this.overview[LEVEL])) this.overview[LEVEL] = new Array();

		for (field_name in this.data){

			path = this.root + '.' + field_name;
			if (is_dict(this.data[field_name]) || is_array(this.data[field_name])){
				this.go_further(
					LEVEL + 1, 
					path, 
					this.data[field_name]
					);
			}
			field = new Field(
				LEVEL, 
				path, 
				field_name, 
				this.data[field_name]
				);
			this.overview[LEVEL][field_name] = field;
		}
		return this.overview;
	}

	// GO FURTHER INTO THE MAZE ...
	this.go_further = function(LEVEL, path, data){

		var field_name;
		var further_path;
		var field;

		if (!is_array(this.overview[LEVEL])) this.overview[LEVEL] = new Array();

		for (field_name in data){

			further_path = path + '.' + field_name;
			if (is_dict(data[field_name]) || is_array(data[field_name])){
				this.go_further(
					LEVEL + 1, 
					further_path, 
					data[field_name]
					);
			}
			field = new Field(
				LEVEL, 
				further_path, 
				field_name, 
				data[field_name]
				);

			if (!is_array(this.overview[LEVEL][field.parent])){ 
				this.overview[LEVEL][field.parent] = new Array();
			}

			this.overview[LEVEL][field.parent].push(field);
		}
	}

	this.get_accordion = function(overview){

		this.overview = overview;
		var LEVEL = 0;
		var object;
		var content;
		var contents = new Array();
		var group;
		var group_id;
		var group_text;
		var groups = new Array();
		var further_accordion;
		var field;
		var field_id;
		var multi;
		
		for (field in this.overview[LEVEL]){
			if (field in this.overview[LEVEL+1]){

				field_id = this.overview[LEVEL][field].path;
				multi = this.overview[LEVEL][field].is_multivalued();

				further_accordion = this.further_accordion(
					field_id, 
					field, 
					this.overview[LEVEL + 1],
					multi
					);

				contents.push(further_accordion);
				delete this.overview[LEVEL][field];
			}
		}

		object = this.to_object(this.overview[LEVEL], first_level=true);
		content = to_table(this.id, object);
		contents.push(content);

		group_id = this.id;
		group_text = 'ID: [' + this.id + ']';
		group = accordion_group(group_id, group_text, contents.reverse());
		this.accordion.accordion.appendChild(group.group);

		return this.accordion.accordion;
	}

	this.further_accordion = function(id, field, view, multi){

		var _field;
		var _field_name;
		var _field_id;
		var object;
		var contents = new Array();
		var content;
		var further_accordion;
		var LEVEL;
		var accordion = new Accordion(id);


		for (_field in view[field]){
			if (view[field][_field].has_children){

				LEVEL = view[field][_field].level;
				_field_name = view[field][_field].name;
				_field_id = view[field][_field].path;

				further_accordion = this.further_accordion(
					_field_id,
					_field_name, 
					this.overview[LEVEL + 1]
					);

				contents.push(further_accordion);
				delete view[field][_field];
			}
		}

		object = this.to_object(view[field]);
		content = to_table(id, object);
		contents.push(content);

		group_id = id;
		group_text = id;
		group = accordion_group(group_id, group_text, contents.reverse());
		accordion.accordion.appendChild(group.group);

		return accordion.accordion
	}

	this.to_object = function(view, first_level){

		var field;
		var new_view = new Object();

		if (first_level){
			for (field in view){
				view[field] = view[field].value;
			}
			return view;
		}
		else {
			for (field in view){
				f = view[field]
				new_view[f.name] = f.value;
			}
			return new_view;
		}

	}


}
