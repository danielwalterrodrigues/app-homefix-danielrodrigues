/**
 * Validate Form
 */
export default (type: string, value: string) => {
	if(value === '' || value === undefined) return 'Campo obrigatório';

	switch(type){
		case 'name': 
			return !(value.length >= 5 && value.trim().split(' ').length >= 2) ?
				'Digite o nome completo' :
				''
				
		case 'cpf': 
			let cpf = value.replace(/[^\d]+/g,''); ;
			let add = 0;
			let errorMessage = 'CPF inválido';    

		    for (i=0; i < 9; i ++)
		        add += parseInt(cpf.charAt(i)) * (10 - i);  
		        rev = 11 - (add % 11);  
		        if (rev == 10 || rev == 11)     
		            rev = 0;    
		        if (rev != parseInt(cpf.charAt(9)))     
		           return errorMessage


		    // Valida 2o digito 
		    add = 0;    
		    for (i = 0; i < 10; i ++)        
		        add += parseInt(cpf.charAt(i)) * (11 - i);  
		    rev = 11 - (add % 11);  
		    if (rev == 10 || rev == 11) 
		        rev = 0;    
		    if (rev != parseInt(cpf.charAt(10)))
		        return errorMessage      
		    return ''; 

		case 'phone': 
			if(
			   	value.length < 15){
				return 'Telefone inválido'
			}

			return ''

		case 'zip': 
			return !(/^([0-9]{5})-?([0-9]{3})$/.test(value)) ?
				'CEP inválido' :
				''
		case 'city': return value.length >= 3
		// case 'state': return (STATES[value] != undefined)
	}

	return '';
}