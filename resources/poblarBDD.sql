USE sprint2;

INSERT INTO users(first_name, last_name, email,username,password,profile_pic,role)
VALUES ('Bruno', 'Fulco', 'bruno.fulco@outlook.com', 'brunof', '123456', 'https://ibb.co/zF5mrtX','God'), 
    ('Jefferson', 'Guttieritos', 'jguttierritos@email.com', 'jeffg', '123456', 'https://ibb.co/BVmwZdz','Admin'), 
    ('Alvin', 'Yakitori', 'ayakitori@email.com', 'alvin420', '123456', 'https://ibb.co/vD9Xxn5','Guest'),
    ('Federico', 'de Fortuny', 'fdefortuny@gmail.com', 'fdefortuny', '123456', 'https://ibb.co/zF5mrtX','God');


INSERT INTO category(name) 
VALUES ('Fruta'), ('Electronicos'), ('Juguetes');

SET @idFruta = (SELECT id FROM category where name = 'Fruta');
SET @idElectronica = (SELECT id FROM category where name = 'Electronicos');


INSERT INTO products(title, description, category_id, price, stock, most_wanted, createdAt, updatedAt)
VALUES ('Manzanas Verdes', 'Manzanas naturales de la huerta de la tia Mariadb', @idFruta, 25, 120, 1,NOW(), NOW()),
('Platanos', 'Platanos naturales de la huerta de la tia Mariadb', @idFruta, 30, 80, 0,NOW(), NOW()),
    ('Mouse inalambrico', 'Presitigioso mouse de color gris y naranja que se puede conectar hasta en 1 computadora', @idElectronica, 449, 10, 1,NOW(), NOW());


SET @idManzana = (SELECT id FROM products where title = 'Manzanas Verdes');
SET @idPlatanos = (SELECT id FROM products where title = 'Platanos');
SET @idMouse = (SELECT id FROM products where title = 'Mouse inalambrico');

INSERT INTO pictures(description,img,product_id)
VALUES ('Muchas manzanas verdes que se ven deliciosas', 'https://ibb.co/PtQ9R3s', @idManzana),
('Platanos extrañamente amarillos', 'https://ibb.co/tpJVMgY', @idPlatanos),
('Mouse gamer que sube los FPS', 'https://ibb.co/mGNDB0K', @idMouse);


SET @idBruno = (SELECT id FROM users where username = 'brunof');
SET @idAlvin = (SELECT id FROM users where username = 'alvin420');
SET @idJeff = (SELECT id FROM users where username = 'jeffg');

INSERT INTO carts(user_id) 
VALUES (@idBruno),(@idAlvin), (@idJeff);


SET @idCartBruno = (SELECT id  FROM carts where user_id = @idBruno);
SET @idCartAlvin = (SELECT id  FROM carts where user_id = @idAlvin);
SET @idCartJeff = (SELECT id  FROM carts where user_id = @idJeff);

INSERT INTO carts_has_products(carts_id, products_id, quantity, add_date)
VALUES (@idCartBruno, @idManzana, 3, NOW()), (@idCartAlvin, @idPlatanos, 10, NOW()),
(@idCartBruno, @idPlatanos, 15, NOW()), (@idCartJeff, @idManzana, 1, NOW()),
(@idCartBruno, @idMouse, 1, NOW());