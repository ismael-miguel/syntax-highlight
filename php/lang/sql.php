<?php
	return array(
		'exts'=>array('sql'),
		'lang'=>array(
		
			array(
				'class'=>'string',
				'match'=>'/([bn]?"(?:[^"]|[\\"]")*"|[bn]?\'(?:[^\']|[\\\']\')*\')(?=[\b\s\(\),;\$#\+\-\*\/]|$)/'
			),
			array(
				'class'=>'comment',
				'match'=>'/((?:\/\/|\-\-\s|#)[^\r\n]*|\/\*(?:[^*]|\*[^\/])*(?:\*\/|$))/',
				'patch'=>function($html){
					//step one: try to fix the spans
					$html = preg_replace(
							'/((?:\/\/|\-\-\s|#)[^\r\n]*|\/\*(?:[^*]|\*[^\/])*(?:\*\/|$))/',
							'$1</span>',
							$html
						);
					
					//step 2: fix single-line comments (-- and #)
					$html = preg_replace_callback(
							'/<span class="comment">((?:#|-- |\/\/)(?:.|<\/span><span class="[^"]+">([^<])<\/span>)*)([\r\n]|$)/',
							function($matches){
								return '<span class="comment">'.
									//cleans up all spans
									preg_replace(
											'/<\/?span(?: class="[^"]+")?>/',
											$matches[1].$matches[2],
											''
										).'</span>'.$matches[3];
							},
							$html
						);
					
					//step 3: fix multi-line comments
					return preg_replace_callback(
							'/<span class="comment">(\/\*(?:[^*]|\*[^\/])+(?:\*\/(?:<\/span>)?|$))/',
							function($matches){
								return '<span class="comment">'.
									//cleans up all spans
									preg_replace(
										'/<\/?span(?: class="[^"]+")?>/',
										$matches[1],
										''
									).'</span>';
							},
							$html
						);
				}
			),
			array(
				/*
				 * numbers aren't that 'regular' and many edge-cases were left behind    
				 * with the help of @MLM (http://stackoverflow.com/users/796832/mlm),    
				 * we were able to make this work.    
				 * he took over the regex and patched it all up, I did the replace string    
				 */
				'match'=>'/((?:^|\b|\(|\s|,))(?![a-z_]+)([+\-]?\d+(?:\.\d+)?(?:[eE]-?\d+)?)((?=$|\b|\s|\(|\)|,|;))/',
				'replace'=>'$1<span class="number">$2</span>$3'
			),
			array(
				'class'=>'name',
				'match'=>'/(`[^`]+`)/'
			),
			array(
				'class'=>'var',
				'match'=>'/(@@?[a-z_][a-z_\d]*)/'
			),
			array(
				'class'=>'keyword',
				//the keyword replace must have an aditional check (`(?!\()` after the name), due to the function replace()
				'match'=>'/\b(accessible|add|all|alter|analyze|and|as|asc|asensitive|before|between|bigint|binary|blob|both|by|call|cascade|case|change|char|character|check|collate|column|condition|constraint|continue|convert|create|cross|current_date|current_time|current_timestamp|current_user|cursor|database|databases|day_hour|day_microsecond|day_minute|day_second|dec|decimal|declare|default|delayed|delete|desc|describe|deterministic|distinct|distinctrow|div|double|drop|dual|each|else|elseif|enclosed|escaped|exists|exit|explain|false|fetch|float|float4|float8|for|force|foreign|from|fulltext|generated|get|grant|group|having|high_priority|hour_microsecond|hour_minute|hour_second|if|ignore|in|index|infile|inner|inout|insensitive|insert|int|int1|int2|int3|int4|int8|integer|interval|into|io_after_gtids|io_before_gtids|is|iterate|join|key|keys|kill|leading|leave|left|like|limit|linear|lines|load|localtime|localtimestamp|lock|long|longblob|longtext|loop|low_priority|master_bind|master_ssl_verify_server_cert|match|maxvalue|mediumblob|mediumint|mediumtext|middleint|minute_microsecond|minute_second|mod|modifies|natural|nonblocking|not|no_write_to_binlog|null|numeric|on|optimize|optimizer_costs|option|optionally|or|order|out|outer|outfile|parse_gcol_expr|partition|precision|primary|procedure|purge|range|read|reads|read_write|real|references|regexp|release|rename|repeat|replace(?!\()|require|resignal|restrict|return|revoke|right|rlike|schema|schemas|second_microsecond|select|sensitive|separator|set|show|signal|smallint|spatial|specific|sql|sqlexception|sqlstate|sqlwarning|sql_big_result|sql_calc_found_rows|sql_small_result|ssl|starting|stored|straight_join|table|terminated|then|tinyblob|tinyint|tinytext|to|trailing|trigger|true|undo|union|unique|unlock|unsigned|update|usage|use|using|utc_date|utc_time|utc_timestamp|values|varbinary|varchar|varcharacter|varying|virtual|when|where|while|with|write|xor|year_month|zerofill)\b/i'
			),
			array(
				'class'=>'func',
				'match'=>'/\b([a-z_][a-z_\d]*)\b(?=\()/i'
			),
			array(
				'class'=>'name',
				'match'=>'/\b([a-z\_][a-z_\d]*)\b/i'
			)
		)
	);
