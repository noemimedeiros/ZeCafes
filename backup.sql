-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: zecafes
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `barista`
--

DROP TABLE IF EXISTS `barista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barista` (
  `conta_id` int NOT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `CPF` varchar(15) NOT NULL,
  `data_nascimento` date NOT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`conta_id`),
  CONSTRAINT `barista_ibfk_1` FOREIGN KEY (`conta_id`) REFERENCES `conta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barista`
--

LOCK TABLES `barista` WRITE;
/*!40000 ALTER TABLE `barista` DISABLE KEYS */;
INSERT INTO `barista` VALUES (1,'(83)9999-9999','123.123.123-12','2001-01-01','barista@email.com'),(2,'(83)98888-9999','321.321.321-21','2000-12-12','gerente@email.com');
/*!40000 ALTER TABLE `barista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conta`
--

DROP TABLE IF EXISTS `conta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chave_seguranca` varchar(25) NOT NULL,
  `foto` varchar(40) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conta`
--

LOCK TABLES `conta` WRITE;
/*!40000 ALTER TABLE `conta` DISABLE KEYS */;
INSERT INTO `conta` VALUES (1,'barista01','usuario/usuario.jpg','Barista Exemplar',0),(2,'123$','usuario/usuario.jpg','Gerente Exemplar',1);
/*!40000 ALTER TABLE `conta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_pagamento`
--

DROP TABLE IF EXISTS `metodo_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_pagamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `metodo` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_pagamento`
--

LOCK TABLES `metodo_pagamento` WRITE;
/*!40000 ALTER TABLE `metodo_pagamento` DISABLE KEYS */;
INSERT INTO `metodo_pagamento` VALUES (1,'Crédito'),(2,'Débito'),(3,'Pix');
/*!40000 ALTER TABLE `metodo_pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `numero` varchar(8) NOT NULL,
  `metodo_pagamento` int NOT NULL,
  `descricao` text NOT NULL,
  `observacoes` varchar(40) DEFAULT NULL,
  `valor` decimal(8,2) NOT NULL,
  `data_pedido` date NOT NULL,
  `barista` int DEFAULT NULL,
  `concluido` tinyint(1) NOT NULL DEFAULT '0',
  `tempo_gasto` time DEFAULT NULL,
  `cancelado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`numero`),
  KEY `metodo_pagamento` (`metodo_pagamento`),
  KEY `barista` (`barista`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`metodo_pagamento`) REFERENCES `metodo_pagamento` (`id`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`barista`) REFERENCES `barista` (`conta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `imagem` varchar(30) NOT NULL,
  `valor` decimal(8,2) NOT NULL,
  `tipo` int NOT NULL,
  `disponivel` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `tipo` (`tipo`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `tipo_produto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Mocha','Mocha.png',14.00,1,1),(2,'Sanduíche','Sanduiche.png',6.00,3,1),(3,'Hambúrger','Hamburger.png',10.00,3,1),(4,'Baguete','Baguete.png',8.00,3,1),(5,'Bolo','Bolo.png',4.00,3,1),(6,'Torta','Torta.png',4.00,4,1),(7,'Brigadeiro','Brigadeiro.png',3.00,4,1),(8,'Pudim','Pudim.png',5.50,4,1),(9,'Suco_de_Laranja','Laranja.png',3.00,2,1),(10,'Guaraná','Guarana.png',3.00,2,1),(11,'Croissant','Croissant.png',12.00,3,1),(12,'Coxinha','Coxinha.png',2.50,3,1),(13,'Petit_gateau','petit_gateau.png',8.00,4,1),(14,'Tiramisu ','Tiramisu.png',6.50,4,1),(15,'Coca_cola','Coca_cola.png',6.00,2,1),(16,'Latte','latte.png',9.60,1,1),(17,'Cappuccino','cappuccino.png',12.30,1,1),(18,'Affogato','affogato.png',15.80,1,1),(19,'Energético','energetico.png',13.25,2,1),(20,'Matcha Latte','matcha.png',13.90,2,1);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_produto`
--

DROP TABLE IF EXISTS `tipo_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_produto`
--

LOCK TABLES `tipo_produto` WRITE;
/*!40000 ALTER TABLE `tipo_produto` DISABLE KEYS */;
INSERT INTO `tipo_produto` VALUES (1,'Café'),(2,'Bebida'),(3,'Lanche'),(4,'Sobremesa');
/*!40000 ALTER TABLE `tipo_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'zecafes'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-23 10:37:45
