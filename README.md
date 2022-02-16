# Aplicação para validar logs estruturados no Nodejs

Quando o servidor estiver em execução, acessar as páginas a seguir criará um log toda vez que o link for invocado.

- http://localhost:3000/ - o servidor enviará uma mensagem hello world. Queremos que Winston capture isso e registre em nosso arquivo de log.

- http://localhost:3000/calc - estamos tentando adicionar variável ya variável x. Neste caso, a variável ynão está definida. Isso gerará um erro e queremos que Winston capture essa instância para nós.

- http://localhost:3000/hello - o servidor que criamos não possui tal URL. Queremos que Winston nos informe quando um link que aponta para nosso endereço IP é acessado, mas não pode ser encontrado; isso é um erro 404.