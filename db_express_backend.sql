/*
 Navicat Premium Data Transfer

 Source Server         : LOCAL MySQL 3306
 Source Server Type    : MySQL
 Source Server Version : 80037 (8.0.37)
 Source Host           : localhost:3306
 Source Schema         : db_express_backend

 Target Server Type    : MySQL
 Target Server Version : 80037 (8.0.37)
 File Encoding         : 65001

 Date: 30/05/2024 22:08:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `stock` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (1, 'JK-45', 'Harry Potter', 'J.K Rowling', 1, '2024-05-30 09:53:57', '2024-05-30 14:23:25');
INSERT INTO `books` VALUES (2, 'SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1, '2024-05-30 09:53:57', '2024-05-30 13:32:55');
INSERT INTO `books` VALUES (3, 'TW-11', 'Twilight', 'Stephenie Meyer', 1, '2024-05-30 09:53:57', '2024-05-30 09:53:57');
INSERT INTO `books` VALUES (4, 'HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 1, '2024-05-30 09:53:57', '2024-05-30 09:53:57');
INSERT INTO `books` VALUES (5, 'NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1, '2024-05-30 09:53:57', '2024-05-30 09:53:57');

-- ----------------------------
-- Table structure for borrows
-- ----------------------------
DROP TABLE IF EXISTS `borrows`;
CREATE TABLE `borrows`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NULL DEFAULT NULL,
  `book_id` int NULL DEFAULT NULL,
  `returned_at` datetime NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of borrows
-- ----------------------------
INSERT INTO `borrows` VALUES (2, 1, 2, '2024-05-30 13:32:55', '2024-05-29 13:10:00', '2024-05-30 13:32:55');
INSERT INTO `borrows` VALUES (3, 1, 1, '2024-05-30 14:23:25', '2024-05-08 14:22:50', '2024-05-30 14:23:25');

-- ----------------------------
-- Table structure for members
-- ----------------------------
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of members
-- ----------------------------
INSERT INTO `members` VALUES (1, 'M001', 'Angga', '2024-05-30 09:53:57', '2024-05-30 09:53:57');
INSERT INTO `members` VALUES (2, 'M002', 'Ferry', '2024-05-30 09:53:57', '2024-05-30 09:53:57');
INSERT INTO `members` VALUES (3, 'M003', 'Putri', '2024-05-30 09:53:57', '2024-05-30 09:53:57');

-- ----------------------------
-- Table structure for penalties
-- ----------------------------
DROP TABLE IF EXISTS `penalties`;
CREATE TABLE `penalties`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrowed_id` int NULL DEFAULT NULL,
  `start_date` datetime NULL DEFAULT NULL,
  `end_date` datetime NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of penalties
-- ----------------------------
INSERT INTO `penalties` VALUES (4, 3, '2024-05-30 14:23:25', '2024-06-02 14:23:25', '2024-05-30 14:23:25', '2024-05-30 14:23:25');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20240530023435-create-member.js');
INSERT INTO `sequelizemeta` VALUES ('20240530023519-create-book.js');
INSERT INTO `sequelizemeta` VALUES ('20240530063332-create-borrows.js');
INSERT INTO `sequelizemeta` VALUES ('20240530063649-create-penalties.js');

SET FOREIGN_KEY_CHECKS = 1;
