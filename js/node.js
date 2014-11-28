(function( ){
	
	
	if( !__WIND__ )
		return false;
	
	var exp = {},
		szexp = 0,
		
		error = 0;//new createNewError("BOOTMODULE");
		
	function cb( a ){ return a.length == 1 ? "0"+a : a; }
	function _e(a,b){
		var tmp,
			argv = [],
			
			fugo = 0,sugo =1;
		
		if( (tmp= exp[a] ) == null || !exp[a] ) 
		{
	//	error.e = 254;
	//	error.pushError("_export_ breakOnModule %c isunknow ",a);
		return false;
		}
		
		if( !tmp._export ){
		
			var i= 0,d,dl,
				ext = tmp._export = {};
		}
	
		if( ( fugo = parseInt(   cb( convert().decbin( b  ) )[0] ) ) )
			sugo = parseInt( cb( convert().decbin( tmp.access  ) )[0] );
		
		else if( ( fugo = parseInt(   cb( convert().decbin( b  ) )[1] ) ) )
			sugo = parseInt( cb( convert().decbin( tmp.access ) )[1] );
		
		if( fugo != sugo )
		{
				//error.e = 252;
				//error.pushError("_export_  breakOnModule %c  export privilege %b binaryPriv %b",tmp.name,tmp.access,b);
				
		return null;
		}

		if( typeof tmp.mount == "function" )
		{
			try{
				while( (d = tmp.depend[i] ) != undefined ){
					
					
					if( d != null || d )
						argv.push( d == "_export" ? ext : _e.call( null, d, b ) );
					
				i++;
				}
				
				if( ( dl= tmp.mount.apply( __WIND__ , argv ) )  )
					tmp._export = dl;
				
				else if( tmp._export );
				else{
				//	error.e = 252;
				//	error.pushError("_export_ breakOnModule %c - %c isunknow ", tmp.mod,tmp.name);
				}
			
			}catch(e){
			//	error.e = 253;
			//	error.pushError("_export_ breakOnModule exports alls dependency");
			};
			
			delete tmp.mount;
			
		}else if( tmp.mount )
			tmp._export = tmp.mount;;
		
	return tmp._export;
	}
	/*
	*	this function allows to import a module,
	*	the parameters is listing down.
	*	The first parameter contains the name of module or function,
	*	then the second parameter contains arguments of dependency ,
	*	the third parameter is the module self him , fourth paramater
	*	are rights access at export and import , 
	*	finally for end the last parameter is reserved for the packages.
	*/
	function _i(a,b,c,d){
	
		var tmp = exp[a] || {};
		
		if( b == null )
			b = [];;
		
		tmp.mod	   = "_Module_"+str_format("%h",szexp++);
		tmp.name   = a;
		tmp.mount  = c;
		tmp.depend = b;
		tmp.access = d;
		
		exp[a] = tmp;
		
	return 1;
	}
	
	function il(a,b){ exp[a] = { mod:"_Module_"+str_format("%h",szexp++), name:a, _export:b ,access:3 }; }
	/*
	* export/import 
	*/
	function _import(a,b,c,d){
		b = ["require","_def","_export"].concat(b);
	return _i( a , b , c , ( d != undefined ? d : 7 ) );
	}
	function _export( n ){ return _e( n , 1 ); }
	function _el( n ){ return _e( n , 2 ); }
	
	/*input*/
	il("require",_el);
	il("_def", _import );
	il("_export",null)
	
	/*ouput*/
	__WIND__._export = _import;
	__WIND__.require = __WIND__._import = _export;
	
})(/*void*/);
