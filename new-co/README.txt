Punoi Drini Fejzullahu

Ne kete projekt kam perdorur keto teknologji: 

node/express, react.js, mssql
styling: bootstrap, material ui
state management: redux,redux-thunk,
dhe disa librari tjera					

per te startuar aplikacionin:


ne fillim e ben import databazen, i ndryshoni parametrat ne backend/db/config.js (user,password,server) ne baz te SQL Serverit tuaj
(pasi ta importoni ne tabelen Role shtoni rolin e Admin dhe User)

pastaj duhen marre te gjitha librarite:
beni run keto komanda
new-co/backend: npm install 
new-co/frontend: npm install



dhe pastaj mund ta startoni aplikacionin ne kete menyre:

new-co/backend: npm start
new-co/frontend: npm start
(dy terminale te ndryshme)

1.Heren e pare kur te startohet aplikacioni ne route /login behet render nje komponent per regjistrimin e userit. Ky komponent behet render vetem heren e pare kur nuk ka usera, nese ka usera behet render Login komponenti
(duhet te keni role per te insertuar nje user, nuk kam krijuar form per te krijuar role keshtu qe duhet t'i shtoni rolet ne db: Admin dhe Assistant ne tabelen Role). 
2.Pasi te keni regjistruar rolet ne db dhe te keni mbushur formen me te dhenat qe kerkon, shtypni Post dhe beni refresh faqen.
3.Nese useri eshte admin ne anen e majt shfaqen 5 linka nese eshte asistent shfaqen 3, ne ato linka mund te shtosh usera,service,produkte,customera dhe shop.
4.Ne anen e djathte shfaqen produktet me servicet e tyre te cilat mund t'i shitni.
5.Nese jeni admin ne navbar shfaqet nje link Admin, ku ne te eshte nje tabel qe lejon te beni update gjithqka, dhe mun te kerkoni ne baz te secilit parameter.
 Delete nuk mund te beni pershkak te lidhjeve ne databaz.

Pasi te logoheni dhe gjithqka eshte ne rregull filloni te insertoni te dhena ne kete radhitje:
1.New User (Assistant).
2.New Shop.
3.New Customer.
4.New Service.
5.New Product.
6.Sell
