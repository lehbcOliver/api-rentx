**RF** => Requisitos Funcionais

**RFN** => Requisitos nao funcionais

**RN** => Regras de negocio


#Cadastro de carro
**RF**
Deve ser possivel cadastrar um novo carro
Deve ser possivel listar todas as categorias.
**RN**
Nao deve ser possivel cadastrar um carro com uma placa ja existente
Nao de ser possivel alterar a placa de um carro ja cadastrado.
O carro deve ser cadastrado como disponibilidade por padrao.
O usuario responsavel pelo cadastro deve ser um usuario administrador


#Listagem de carros
**RF**
Deve ser possivel listar todos os carros disponiveis
Deve ser possivel listar todos os carros disponiveis, pelo nome da categoria.
Deve ser possivel listar todos os carros disponiveis, pelo nome da marca.
Deve ser possivel listar todos os carros disponiveis, pelo nome do carro.

**RN**
O usuario nao precisar estar logado no sistema.

#Cadastro de especificada no carro
**RF**
Deve ser possivel cadastrar uma especificacao para um carro
Deve ser possivel listar todas as especificacoes.
Deve ser possivel listar todos os carros.

**RN**
Nao deve ser possivel cadastrar uma especificacao para um carro nao cadastrado.
Nao deve ser possivel cadastrar uma especificacao ja existente para o mesmo carro.
O usuario responsavel pelo cadastro deve ser um usuario administrador


#Cadastro de imagens do carro
**RF**
Deve ser possivel cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.

**RNF**
Ultilizar o multer para upload dos arquios

**RN**
 O usuario deve pode cadastrar mais de uma imagem para o mesmo carro.
 O usuario responsavel pelo cadastro deve ser um usuario administrador.

 #Aluguel de carro
 **RF**
 Deve ser possivel cadastrar um aluguel.

 **RN**
 O aluguel seve ter duracao minima de 24 horas.
 Nao deve ser possivel cadastrar um novo aluguel, caso ja exista um aberto pra o mesmo usuario.
 Nao deve ser possivel cadastrar um novo aluguel, caso ja exista um aberto pra o mesmo carro.