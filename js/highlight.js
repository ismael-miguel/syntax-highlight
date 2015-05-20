(function(window){
	
	var f=window.highlight = function(element, lang){
        
		if(element instanceof NodeList || element instanceof HTMLCollection)
		{
			for(var i = 0, l = element.length; i<l; i++)
			{
                try
                {
                    f( element[i], lang );
                }
                catch(e)
                {
                    //we want to give a chance to all the other elements
                    (console.error || console.log).call( console, e.message );
                }
			}
			return true;
		}
		
		if(!(element instanceof Element))
		{
			throw new TypeError( 'The 1st parameter must be an Element or NodeList' );
		}
		
		lang = lang || element.getAttribute('data-lang');
		
		if(!lang)
		{
			throw new TypeError( 'Missing language definition. Set the 2nd parameter or the attribute data-lang' );
		}
		
		var lang_defs = f.langs[lang];
		
		if(!lang_defs)
		{
			throw new TypeError( 'The language "' + lang + '" was not yet defined' );
		}
		
		//create a document fragment, to avoid reflow and increase performance
		var fragment = document.createDocumentFragment(),
			div = document.createElement('div');
		
		div.innerHTML = element.innerHTML;
		fragment.appendChild(div);
		
		for(var i = 0, l = lang_defs.length; i<l; i++)
		{
			var html = '';
			
			for(var j = 0, k = div.childNodes.length; j<k; j++)
			{
				if(div.childNodes[j].nodeType === 3)
				{
					html += div.childNodes[j].nodeValue
						.replace(
							lang_defs[i].match,
							/*shortcut to decide if the lang_defs[i].replace is one of those types
							 *if so, passes it directly
							 *otherwise, makes a string matching based on the object
							 */
							{'string':1, 'function':1}[ typeof lang_defs[i].replace ]
								? lang_defs[i].replace
								: '<' + lang_defs[i].replace.tag +
									' class="' + lang_defs[i]['class'] + '">' +
										lang_defs[i].replace.text +
									'</' + lang_defs[i].replace.tag + '>'
						);
				}
				else
				{
					html += div.childNodes[j].outerHTML;
				}
			}
			
			//refreshes the HTML, before doing anything else
			div.innerHTML = html;
			
			if('function' === typeof lang_defs[i].patch)
			{
				var returned = lang_defs[i].patch.call( div );
				if('string' === typeof returned)
				{
					div.innerHTML = returned;
				}
			}
		}
		
		
		//only change at the end, to avoid unnecessary reflow
		element.className += ' highlight ' + lang;
		element.innerHTML = div.innerHTML;
		
		return true;
	};

	//default replace object
	f.default_replace = {'tag': 'span', 'text': '$1'};
	
	//all the languages will be added here
	f.langs = {};

})(Function('return this')());//just be sure that we have the real window
