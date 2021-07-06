CREATE DATABASE `movielib`;
use `movielib`;

CREATE TABLE `users` (
  `id` int PRIMARY KEY auto_increment,
  `name` char(25) not null,
  `password` char(30) not null
);

CREATE TABLE `favorites` (
  `userId` int not null,
  `movieId` int not null,
  
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
);

CREATE TABLE `ratings` (
  `userId` int not null,
  `movieId` int not null,
  `raing` int not null,
  
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
);

CREATE TABLE `notes` (
  `userId` int not null,
  `movieId` int not null,
  `note` VARCHAR(100) not null,
  
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
);

