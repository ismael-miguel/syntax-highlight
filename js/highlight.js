function highlight(lang,element)
{
	var default_replace={tag:'span',text:'$1'},
		lang_defs={
			'sql':[
					{
						'class':'string',
                        'regex':/("(?:[^"]|\\")*"|'(?:[^']|\\')*')(?=[\b\s\(\),])/g,
						'replace':default_replace
					},
					{
						'class':'number',
                        'regex':/(?![a-z_\-])(\d+(?:\.\d+))(?=[\b\s\(\),])/g,
						'replace':default_replace
					},
					{
						'class':'name',
						'regex':/(`[^`]+`)/g,
						'replace':default_replace
					},
					{
						'class':'keyword',
						'regex':/\b(accessible|add|all|alter|analyze|and|as|asc|asensitive|before|between|bigint|binary|blob|both|by|call|cascade|case|change|char|character|check|collate|column|condition|constraint|continue|convert|create|cross|current_date|current_time|current_timestamp|current_user|cursor|database|databases|day_hour|day_microsecond|day_minute|day_second|dec|decimal|declare|default|delayed|delete|desc|describe|deterministic|distinct|distinctrow|div|double|drop|dual|each|else|elseif|enclosed|escaped|exists|exit|explain|false|fetch|float|float4|float8|for|force|foreign|from|fulltext|generated|get|grant|group|having|high_priority|hour_microsecond|hour_minute|hour_second|if|ignore|in|index|infile|inner|inout|insensitive|insert|int|int1|int2|int3|int4|int8|integer|interval|into|io_after_gtids|io_before_gtids|is|iterate|join|key|keys|kill|leading|leave|left|like|limit|linear|lines|load|localtime|localtimestamp|lock|long|longblob|longtext|loop|low_priority|master_bind|master_ssl_verify_server_cert|match|maxvalue|mediumblob|mediumint|mediumtext|middleint|minute_microsecond|minute_second|mod|modifies|natural|nonblocking|not|no_write_to_binlog|null|numeric|on|optimize|optimizer_costs|option|optionally|or|order|out|outer|outfile|parse_gcol_expr|partition|precision|primary|procedure|purge|range|read|reads|read_write|real|references|regexp|release|rename|repeat|replace|require|resignal|restrict|return|revoke|right|rlike|schema|schemas|second_microsecond|select|sensitive|separator|set|show|signal|smallint|spatial|specific|sql|sqlexception|sqlstate|sqlwarning|sql_big_result|sql_calc_found_rows|sql_small_result|ssl|starting|stored|straight_join|table|terminated|then|tinyblob|tinyint|tinytext|to|trailing|trigger|true|undo|union|unique|unlock|unsigned|update|usage|use|using|utc_date|utc_time|utc_timestamp|values|varbinary|varchar|varcharacter|varying|virtual|when|where|while|with|write|xor|year_month|zerofill)\b/gi,
						'replace':default_replace
					},
					{
						'class':'func',
						'regex':/\b([a-z_][a-z_\d]*)\b(?=\()/gi,
						'replace':default_replace
					}
				]
		}[lang];
	
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
}
