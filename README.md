# Order-tool

## O sistema web é capaz de receber arquivos .CSV com planilhas de pedidos. Existe uma tela de dashboard, de visualização e filtro de pedidos, além de importação da planilha localmente. 
### Foi desenvolvida uma API para gerar orçamentos com base em:
- `DATA` - O valor varia conforme a data incidente 
- `PRODUTO` - O valor varia conforme o produto
- `LOCALIZAÇÃO` - O frete e a data de entrega variam conforme localização

## Tecnologias usadas:
```
Angular
C#
Bootstrap 5.0
TypeScript
Entity Framework
```
## Rodando o serviço

O serviço precisa ser inicializado com duas instâncias separadas, uma parada o front-end e outra parada o back-end.

A linha de comando para inicializar o front-end é a seguinte:
```
ng serve
```
E com o seguinte código para o back-end:
```
dotnet run
```

Desenvolvido por: Maria Emília Castello.
