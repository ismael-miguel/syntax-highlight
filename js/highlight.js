window.highlight=function highlight(lang,element){

	var lang_defs=window.highlight[lang];
	
	for(var i=0,l=lang_defs.length;i<l;i++)
	{
		var html='';
		
		for(var j=0,k=element.childNodes.length;j<k;j++)
		{
			if(element.childNodes[j].nodeType === 3)
			{
				html+=element.childNodes[j].nodeValue
					.replace(
						lang_defs[i].regex,
						'string' === lang_defs[i].replace
							? lang_defs[i].replace
							: '<'+lang_defs[i].replace.tag+
								' class="'+lang+' '+lang_defs[i]['class']+'">'+
									lang_defs[i].replace.text+
								'</'+lang_defs[i].replace.tag+'>'
					);
			}
			else
			{
				html+=element.childNodes[j].outerHTML;
			}
		}
		element.innerHTML=html;
	}
};

window.highlight.default_replace={tag:'span',text:'$1'};
