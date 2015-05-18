<?php

final class highlight {
	
	private static $langs = array();
	private static $exts = array();
	private static $default_replace = array(
			'tag'=>'span',
			'text'=>'$1'
		);
	
	static function highlight_string($lang, $code) {
		if(isset(self::$langs[$lang]))
		{
			$lang_defs = &self::$langs[$lang];
			
			$dom = new DOMDocument('1.0', 'utf-8');

			$element = $dom->createElement('code', $code);
			
			$element->setAttribute('class','highlight '.$lang);
			
			$dom->appendChild($element);
			
			foreach($lang_defs as $k=>&$lang_def)
			{
				$html = '';
				
				while($child = &$element->firstChild)
				{
					
					if($child->nodeType === 3)
					{
						
						if(!isset($lang_def['replace']))
						{
							$lang_def['replace'] = self::$default_replace;
						}
						
						switch(gettype($lang_def['replace']))
						{
							case 'string':
								$html .= preg_replace(
										$lang_def['match'],
										$lang_def['replace'],
										$child->nodeValue
									);
								break;
							case 'array':
								$html .= preg_replace(
										$lang_def['match'],
										'<' . $lang_def['replace']['tag'] .
										' class="' . $lang_def['class'] . '">' .
											$lang_def['replace']['text'] .
										'</' . $lang_def['replace']['tag'] . '>',
										$child->nodeValue
									);
								break;
							case 'object':
								$html .= preg_replace_callback(
										$lang_def['match'],
										$lang_def['replace'],
										$child->nodeValue
									);
								break;
								
						}
					}
					else
					{
						$html .= $child->nodeValue;
					}
					
					$element->removeChild($child);
					
				}
				
				if($html)
				{
					$fragment = $dom->createDocumentFragment();
					
					$fragment->appendXML(isset($lang_def['patch'])?$lang_def['patch']($html):$html);
					
					$element->appendChild($fragment);
					
					if($element->nodeValue == $code)
					{
						trigger_error('Syntax highlight failed on the rule no. '.$k.', for the language '.$lang,E_USER_WARNING);
						
						return false;
					}
					
					echo '<br>',htmlentities($dom->saveXML()),'<br>',var_dump($element);
				}
			}
			
			//removes the xml declaration
			return trim(
					str_replace(
						'<?xml version="1.0" encoding="utf-8"?>',
						'',
						$dom->saveXML()
					),
					"\r\n"
				);

		}
		else
		{
			return false;
		}
	}
	
	static function highlight_file($file) {
		
		if(@is_file($file))
		{
			if(preg_match('@(?P<file>.*)\.(?P<ext>[^\.]*)$@', $file, $name) && isset(self::$langs[$name['ext']]))
			{
				return self::highlight_string(self::$langs[$name['ext']], file_get_contents($file));
			}
		}
		else
		{
			return false;
		}
	}
	
	static function add_lang($lang, $defs){
		switch(gettype($defs)){
			case 'string':
				$defs = (array)include($defs);
				if( $defs === array() )
				{
					return false;
				}
			case 'array':
				
				self::$langs[$lang] = $defs['lang'];
				
				foreach( $defs['exts'] as $ext)
				{
					self::$exts[$ext] = $lang; 
				}
				
				break;
			default:
				return false;
		}
		return true;
	}
	
	static function lang_loaded($lang) {
		return isset(self::$langs[$lang]);
	}
	
};
