

data = {
   "recebimento": "",
    "maxwidth": '100%',
    "backgroundcolor": 'transparent',
    "bordercollapse": 'collapse',
    "borderspacing": '0',
   "fileArquivo": null,
   "datadoc": "11/06/2013",
   "assunto": "423423432",
   "id_reg": "21",
   "tipo": "oficio",
   "numero": "432432",
   "complorigem": null,
   "anexosrecebidos": null,
   "orgaodeSaida": null,
   "orgaoOrigem": "4234324234324",
   "arquivo": {
      "mimetype": {"foo":"data","id_doc":{"data":"111", "data2":"222"}},
      "nome_doc": "nome",
      "id_doc": "id"
   },
   "orgaoSaida": null,
   "complOrigem": null,
   "interouremet": "432432424",
   "campodotoin":{
      "mimetype": "mime", 
      "nome_doc": "nome2",
      "id_doc": "id2",
      "outro":{
         "mimetype": "MIME2",
         "nome_doc": "NOMEDOC2",
         "id_doc": [
		{"data":"111", "data2":"222"},
		{"data":"111", "data2":"222"},
		{"data":"333", "data2":"444"},
	 ],
      }
   },
   "multivalorado":[
		{"data":"111", "data2":"222"},
		{"data":"111", "data2":"222"},
		{"data":"333", "data2":"444"},
   ]
}

/*data={   
	"id_reg":55,
	"multivalorado":[
		{"data":"111", "data2":"222"},
		{"data":"111", "data2":"222"},
		{"data":"333", "data45":["a","6666","7777","d","e"]},
		//{"data":"333", "data2":["11","22","33","d","e"]},
   ]
}*/


id = data['id_reg'];
delete data['id_reg'];

view = new RegistryView(id, data);
overview = view.get_overview();
accordion = view.get_accordion(overview);

body = document.getElementsByTagName('body')[0]
body.appendChild(accordion);

$(function(){

	$.fn.editable.defaults.mode = 'inline'
	for (var reg in REGISTRY){
		$('#'+ REGISTRY[reg]).editable({
			//url: '/post',
			type: 'text',
			pk: 1,
			name: REGISTRY[reg],
			title: 'XXXXXXXX'
		});
	}

});






