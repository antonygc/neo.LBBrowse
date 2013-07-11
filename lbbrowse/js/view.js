

data = {
   "recebimento": "",
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
		{"data":"333", "data2":"444"},
   ]
}*/


/*acc = new Accordion('accordion1');
acc2 = new Accordion('accordion2');

level1 = dummy_data;
level2 = dummy_data.arquivo;

content1 = to_table(level1);
content2 = to_table(level2);
content3 = to_table(level2);

group3 = accordion_group('LEVEL3-1', 'Base.arquivo.blabla', [content3]);
acc2.accordion.appendChild(group3.group);

group1 = accordion_group('LEVEL1-2', 'Base', [content1]);
group2 = accordion_group('LEVEL2-3', 'Base.arquivo', [content2, acc2.accordion]);

acc.accordion.appendChild(group1.group);
acc.accordion.appendChild(group2.group);

body = document.getElementsByTagName('body')[0]
body.appendChild(acc.accordion);*/

__base_name__ = 'base_teste';
id = data['id_reg'];
delete data['id_reg'];

view = new RegistryView(id, data, __base_name__);
overview = view.get_overview();
accordion = view.get_accordion(overview);

body = document.getElementsByTagName('body')[0]
body.appendChild(accordion);








