
function AccordionInner(content){

    	// <div class="accordion-inner"> [content] </div>
	var inner = document.createElement('div');

	inner.setAttribute('class', 'accordion-inner');
	for (var i in content){
		inner.appendChild(content[i]);
	}

	this.content = content;
	this.inner = inner;
}

function AccordionBody(id, inner){

	// <div class="accordion-body collapse" id="[id]"> [inner] </div>
	var body = document.createElement('div');
	var body_id = id.toString().replace(/\./g,'-') + '-collapse'; 

	body.setAttribute('class', 'accordion-body collapse');
	body.setAttribute('id', body_id);
	body.appendChild(inner.inner);

	this.inner = inner
	this.body = body;
}

function AccordionToggle(id, text){

	// <a class="accordion-toggle" href="[href]" data-toggle="collapse" 
	// data-parent="[data_parent]"> [text] </a>
	var href = '#' + id.toString().replace(/\./g,'-') + '-collapse';
	var data_parent = '#' + id; 
	var toggle = document.createElement('a');

	toggle.setAttribute('class', 'accordion-toggle');
	toggle.setAttribute('href', href);
	toggle.setAttribute('data-toggle', 'collapse');
	toggle.setAttribute('data-parent', data_parent);
	toggle.innerText = text;

	this.text = text
	this.toggle = toggle;
}

function AccordionHead(toggle){

        // <div class="accordion-heading"> [toggle] </div>
	var head = document.createElement('div');

	head.setAttribute('class','accordion-heading');
	head.appendChild(toggle.toggle);

	this.toggle = toggle;
	this.head = head;
}

function AccordionGroup(head, body){

        // <div class="accordion-group"> [head] [body] </div>
	var group = document.createElement('div');

	group.setAttribute('class','accordion-group');
	group.appendChild(head.head);
	group.appendChild(body.body);

	this.head = head;
	this.group = group;
}

function Accordion(id){

	/*<div class="accordion" id="[id]"> [group] [body] <div/>*/
	var accordion = document.createElement('div');

	accordion.setAttribute('class', 'accordion');

	// For some weird cause, bootstrap's accordion does not work without replacing ids
	accordion.setAttribute('id', id.toString().replace(/\./g,'-') + '-accordion');

	this.accordion = accordion;
}
