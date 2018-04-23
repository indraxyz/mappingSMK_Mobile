/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.7.9 : Database - pemetaansmk
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pemetaansmk` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `pemetaansmk`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL,
  `password` varchar(10) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `akses` char(1) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `admin` */

insert  into `admin`(`username`,`password`,`email`,`akses`,`last_login`,`created_at`,`updated_at`) values ('admin','123','a@dd.com','1','2018-04-23 12:24:28','2017-06-24 05:25:44','2017-06-24 05:25:44'),('bayu_P','3','xx@xx.com','0',NULL,NULL,'2017-06-24 06:50:02'),('indra_X','12','1@s.co','1',NULL,'2017-06-24 05:23:49','2017-06-24 05:23:49'),('laravel','666','xx@xx','0',NULL,NULL,NULL);

/*Table structure for table `foto_sekolah` */

DROP TABLE IF EXISTS `foto_sekolah`;

CREATE TABLE `foto_sekolah` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `id_sekolah` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_foto_sekolah_id_sekolah` (`id_sekolah`),
  CONSTRAINT `fk_foto_sekolah_id_sekolah` FOREIGN KEY (`id_sekolah`) REFERENCES `sekolah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `foto_sekolah` */

/*Table structure for table `komentar` */

DROP TABLE IF EXISTS `komentar`;

CREATE TABLE `komentar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teks` text,
  `waktu` datetime DEFAULT NULL,
  `id_user` varchar(20) DEFAULT NULL,
  `id_sekolah` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_komentar_id_user` (`id_user`),
  KEY `fk_komentar_id_sekolah` (`id_sekolah`),
  CONSTRAINT `fk_komentar_id_sekolah` FOREIGN KEY (`id_sekolah`) REFERENCES `sekolah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_komentar_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

/*Data for the table `komentar` */

insert  into `komentar`(`id`,`teks`,`waktu`,`id_user`,`id_sekolah`,`created_at`,`updated_at`) values (7,'komentar sekarang','2017-07-12 07:33:14','balkhis',9,'2017-07-12 07:33:14','2017-07-12 07:33:14'),(8,'sekolah nya bagus','2017-07-12 07:43:34','balkhis',9,'2017-07-12 07:43:35','2017-07-12 07:43:35'),(9,'mantap gan','2017-07-12 07:43:55','balkhis',9,'2017-07-12 07:43:55','2017-07-12 07:43:55'),(10,'disini bagus','2017-07-12 07:45:37','balkhis',9,'2017-07-12 07:45:37','2017-07-12 07:45:37'),(13,'cobaaaa','2017-07-12 07:50:58','balkhis',9,'2017-07-12 07:50:58','2017-07-12 07:50:58'),(14,'okeeee okeeee','2017-07-12 07:59:01','balkhis',9,'2017-07-12 07:59:01','2017-07-12 07:59:01'),(15,'disiniiii','2017-07-12 08:00:21','balkhis',10,'2017-07-12 08:00:22','2017-07-12 08:00:22'),(16,'okokokokk','2017-07-12 08:02:38','balkhis',10,'2017-07-12 08:02:38','2017-07-12 08:02:38'),(17,'okokokokk','2017-07-12 08:02:38','balkhis',10,'2017-07-12 08:02:38','2017-07-12 08:02:38'),(18,'yaaaaa','2017-07-12 08:03:04','balkhis',10,'2017-07-12 08:03:04','2017-07-12 08:03:04'),(19,'kiiiii','2017-07-12 08:31:56','balkhis',9,'2017-07-12 08:31:56','2017-07-12 08:31:56'),(20,'okeee','2017-07-12 12:44:30','kus',9,'2017-07-12 12:44:30','2017-07-12 12:44:30'),(21,'tes 1 2 3','2017-07-12 15:39:04','kus',9,'2017-07-12 15:39:04','2017-07-12 15:39:04'),(22,'saya pengen masuk sekolah sini','2017-07-12 17:17:43','balkhis',15,'2017-07-12 17:17:43','2017-07-12 17:17:43'),(23,'okeeee siiip','2017-07-12 19:50:18','balkhis',14,'2017-07-12 19:50:18','2017-07-12 19:50:18'),(24,'okeeee','2017-07-13 10:55:37','balkhis',12,'2017-07-13 10:55:37','2017-07-13 10:55:37'),(25,'iyaaaaaaa','2017-07-13 10:56:05','balkhis',12,'2017-07-13 10:56:05','2017-07-13 10:56:05'),(26,'saya sudah pernah kesini, bagus','2017-07-13 12:20:12','balkhis',13,'2017-07-13 12:20:12','2017-07-13 12:20:12'),(27,'okeee','2017-07-13 12:20:21','balkhis',13,'2017-07-13 12:20:21','2017-07-13 12:20:21'),(28,'oke yaaa','2017-07-13 12:20:41','balkhis',13,'2017-07-13 12:20:41','2017-07-13 12:20:41'),(29,'nooob','2017-07-17 02:17:49','balkhis',11,'2017-07-17 02:17:49','2017-07-17 02:17:49'),(30,'mantap','2017-07-17 02:26:16','balkhis',10,'2017-07-17 02:26:16','2017-07-17 02:26:16'),(31,'waaaw','2017-07-17 02:32:37','untag',9,'2017-07-17 02:32:37','2017-07-17 02:32:37'),(32,'sip','2017-07-17 03:51:11','balkhis',15,'2017-07-17 03:51:11','2017-07-17 03:51:11'),(33,'okeee','2017-07-17 03:52:00','untag',11,'2017-07-17 03:52:00','2017-07-17 03:52:00'),(34,'wokei','2017-07-17 04:05:07','balkhis',15,'2017-07-17 04:05:07','2017-07-17 04:05:07'),(35,'kakaka','2017-07-17 09:42:21','balkhis',15,'2017-07-17 09:42:21','2017-07-17 09:42:21'),(36,'haha','2017-07-17 09:42:30','balkhis',15,'2017-07-17 09:42:30','2017-07-17 09:42:30'),(41,'ooooh','2017-07-20 15:52:53','untag',10,'2017-07-20 15:52:53','2017-07-20 15:52:53'),(43,'nice buddy','2017-07-24 15:43:41','balkhis',11,'2017-07-24 15:43:41','2017-07-24 15:43:41'),(44,'xxxx','2017-07-24 15:49:28','balkhis',9,'2017-07-24 15:49:28','2017-07-24 15:49:28'),(45,'nice buddy','2017-07-24 15:49:35','balkhis',9,'2017-07-24 15:49:35','2017-07-24 15:49:35'),(46,'ini yaa','2017-07-26 13:16:32','balkhis',19,'2017-07-26 13:16:32','2017-07-26 13:16:32'),(47,'iyaa betul','2017-07-26 13:16:38','balkhis',19,'2017-07-26 13:16:38','2017-07-26 13:16:38');

/*Table structure for table `sekolah` */

DROP TABLE IF EXISTS `sekolah`;

CREATE TABLE `sekolah` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `tlp` varchar(15) DEFAULT NULL,
  `akreditas` char(1) DEFAULT NULL,
  `website` varchar(30) DEFAULT NULL,
  `deskripsi` text,
  `kep_sek` varchar(50) DEFAULT NULL,
  `status_mutu` varchar(10) DEFAULT NULL,
  `sertifikasi_iso` varchar(30) DEFAULT NULL,
  `dicari` int(11) DEFAULT NULL,
  `rayon` char(1) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `long` float DEFAULT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

/*Data for the table `sekolah` */

insert  into `sekolah`(`id`,`nama`,`alamat`,`email`,`tlp`,`akreditas`,`website`,`deskripsi`,`kep_sek`,`status_mutu`,`sertifikasi_iso`,`dicari`,`rayon`,`lat`,`long`,`foto`,`created_at`,`updated_at`) values (9,'SMKN 1 SURABAYA','Jl. SMEA No. 4 Surabaya Kec. Wonokromo kel : Wonokromo Surabaya 60243','info.smkn1sby@gmail.com','0318292038','A','www.smkn1-sby.sch.id','visi(“MENJADI SEKOLAH MENENGAH KEJURUAN BERSTANDAR INTERNASIONAL YANG TAMATANNYA PROFESSIONAL, BERBUDI PEKERTI LUHUR, BERWAWASAN LINGKUNGAN SERTA MAMPU BERKOMPETISI DI ERA GLOBAL”)\r\nmisi (1. Menerapkan manajemen standar ISO dalam pengelolaan sekolah 2. Meningkatkan profesionalisme 3. Meningkatkan mutu penyelenggaraan pendidikan 4. Membangun serta memberdayakan SMK bertaraf Internasional sehingga menghasilkan lulusan yang memiliki jati diri bangsa dan keunggulan kompetitif di pasar nasional dan global 5. Mengembangkan kerja sama industri, berskala nasional maupun internasional)\r\n\r\nJURUSAN : PEMASARAN, ADMINISTRASI PERKANTORAN, AKUNTANSI, DESAIN KOMUNIKASI VISUAL, AKOMODASI PERHOTELAN, TEKNIK PRODUKSI DAN PENYIARAN PROGRAM PERTELEVISIAN, MULTIMEDIA, REKAYASA PERANGKAT LUNAK, TEKNIK KOMPUTER DAN JARINGAN.','Drs. Bahrun, ST, MM','Negeri','ISO 9001:2008',NULL,'2',-7.305,112.734,'smkn1.jpg',NULL,NULL),(10,'SMKN 7 SURABAYA','Jl. PAWIYATAN NO.2 SURABAYA Kecamatan : Kec. Bubutan Desa/kel : Bubutan Surabaya 60174','smknegeri7sby@yahoo.com','0315342407','A','www.smkn7-sby.sch.id','VISI->Menjadikan SMK Negeri 7 Surabaya sbagai sekolah yang unggul, berkualitas dengan dilandasi iman dan taqwa, serta mampu bersaing ditingkat nasional maupun internasional.\r\nMISI->1. Menumbuhkan semangat kompetitif dalam pencapaian keunggulan dan peningkatan kualitas secara berkelanjutan kepada semua  komponen sekolah.\r\n2. Mengembangkan iklim belajar yang kondusif dengan dukungan sarana dan prasarana serta sistem yang menunjang pengembangan sumberdaya manusia yang optimal.\r\n3. Mengembangkan sistem pendidikan dan pelatihan yang memiliki wawasan industri masa depan dan wawasan wirausaha yang mandiri.\r\n4. Meningkatkan kemampuan intelektual dan mutu lulusan yang berorientasi pada pencapaian kompetensi berstandar nasional maupun internasional.\r\n5. Menerapkan manajeman pengelolaan yang mengacu pada standar ISO 9001- 2008 dengan melibatkan seluruh komponen sekolah dan pihak yang terkait.\r\n6. Mengembangkan bisnis senter teknologi.\r\n7. Mengembangkan pendidikan yang berwawasan lingkungan.\r\n\r\nJURUSAN : Teknik Gambar Bangunan,Teknik Konstruksi Batu Beton,Teknik Audio Video,Teknik Instalasi Tenaga Listrik,Teknik Pemesinan,Teknik Kendaraan Ringan,Teknik Pendingin Dan Tata Udara,Teknik Komputer Dan Jaringan','Drs. AGUS BASUKI, MM','Negeri','9001:2008',NULL,'1',-7.2511,112.731,'smkn7.jpg',NULL,'2017-07-24 12:24:28'),(11,'SMKN 3 SURABAYA','Jalan Jendral A. Yani, Gayungan, Dukuh Menanggal, Gayungan, Kota SBY, Jawa Timur ','smkn3_sby@yahoo.co.id','0318412886','A','www.smkn3-sby.sch.id','VISI(Menjadi SMK yang menghasilkan tamatan yang menguasai Imtaq dan Iptek yang dapat bersaing di era global.)\r\nMISI(1.Menyelenggarakan layanan pendidikan yang menyenangkan dan berkualitas untuk menghasilkan lulusan yang bisa bersaing 2. Menyiapkan lulusan yang memiliki kompetensi handal un tuk bersaing di era global.)\r\n\r\nJURUSAN : Teknik Multi Media, Teknik Kendaraan Ringan, Teknik Pemesinan, Teknik Gambar Bangunan,Tenik Pemanfaatan Tenaga Listrik, Teknik Audio Video\r\n','MUDIANTO,SPd, MM','Negeri','9001:2008',NULL,'2',-7.34365,112.73,'smkn3.jpg',NULL,NULL),(12,'SMKN 4 SURABAYA','Jl. KRANGGAN NO. 81-101 SURABAYA Kec. Sawahan kel : Sawahan Surabaya ','smknempatsby@yahoo.com','0315345788','A','www.smkn4sby.com','VISI(Menciptakan SMK NEGERI 4 SURABAYA sebagai salah satu pusat pendidikan dan pelatihan yang berorientasi pada kecakapan hiduf (Life skill), dengan tamatan yang berbudi pekerti luhur, dan memiliki kompetensi berstandar nasional/ internasional serta mampu berkompetisi pada Era Global.)\r\nMISI(1. Menyelenggarakan pendidikan dan pelatihan sesuai dengan kebutuhan dunia kerja pada Era Global 2. Mengupayakan peningkatan profesionalisme guru agar tercipta proses belajar mengajar yang bermutu 3. Menciptakan kedisiplinan dan menjunjung tinggi norma agama dan nilai-nilai budaya yang luhur )\r\n\r\nJURUSAN : Multimedia, Akuntansi, Adm Perkantoran, Pemasaran, Usaha Perj Wisata','Drs. SOFYAN. ST., MT.','Negeri','9001:2000',NULL,'2',-7.25644,112.73,'smkn4.jpg',NULL,NULL),(13,'SMKN 6 SURABAYA','Jl. MARGOREJO 76 SURABAYA Kec. Wonocolo kel : Margorejo Surabaya 60238','smkn6s@yahoo.com','0318438267','A','www.smkn6sby.sch.id','VISI(Mewujudkan SMK Negeri 6 Surabaya sebagai lembaga Diklat Kejuruan yang berstandar Nasional dan Internasional untuk memenuhi kebutuhan tenaga kerja tingkat menengah yang profesional dalam memasuki era perdagangan bebas sejak 2003 (AFTA)\r\nMISI(1. Memberikan pendidikan dan pelatihan terbaik yang mengacu pada konsep Life skill. Baik generik skill maupun vokasional skill yang berorientasi pada masa depan bangsa 2. Mengantarkan siswa menjadi tenaga kerja tingkat menengah yang bertaqwa pada Allah SWT, berdedikasi, beretos kerja, dan memiliki profesionalitas tinggi terhadap pekerjaan)\r\n\r\nJURUSAN : Akomodasi Perhotelan, Jasa Boga, Kecantikan Rambut , Tata Busana, Multimedia, Usaha Perjalanan Wisata, Patiseri, Kecantikan Kulit, Akuntansi ','Dra. SITI ROCHANAH, MM','Negeri','9001:2000',NULL,'2',-7.31636,112.741,'smkn6.jpg',NULL,NULL),(14,'SMKN 2 SURABAYA','Jl. TENTARA GENIE PELAJAR ( PATUA ) NO. 26 Kec. Sawahan kel : Petemon ','smekda.surabaya@gmail.com','0315343708 ','A','www.smkn2sby.sch.id','Visi (MENJADI LEMBAGA PENDIDIKAN PELATIHAN TEKNOLOGI DAN INDUSTRI YANG DAPAT MELAYANI SERTA MEMENUHI TUNTUTAN KEBUTUHAN DUNIA INDUSTRI MEMASUKI ERA GLOBAL)\r\nmisi(MEMBENTUK SDM BERIMTAQ UNTUK MEMBERI PELAYANAN KEPADA MASYARAKAT, DUNIA USAHA DAN INDUSTRI, MELALUI PENDIDIKAN PELATIHAN TEKNOLOGI DAN INDUSTRI DENGAN STANDAR SERTIFIKASI NASIONAL, BERORIENTASI KEPADA PRESTASI YANG BERKESINAMBUNGAN DAN KELESTARIAN LINGKUNGAN HIDUP)\r\n\r\nJURUSAN : Teknik Gambar Bangunan, Teknik Sepeda Motor, Teknik Komputer Dan Jaringan,Animasi, Teknik Audio-Video, Teknik Kendaraan Ringan, Teknik Pemesinan, Teknik Instalasi Tenaga Listrik, Teknik Kontruksi Kayu.','Drs. Djoko Pratmodjo Yudhi Utomo, MM','Negeri','9001:2008',NULL,'2',-7.25842,112.725,'smkn2.jpg',NULL,NULL),(15,'SMKN 8 SURABAYA','Jl. KAMBOJA NO. 18 SURABAYA Kec. Genteng kel : Ketabang Surabaya 60272','smknegeri8sby@gmail.com','0315342410','A','www.smekdels.com','VISI(Sebagai pusat layanan diklat yang profesional dan diakui secara nasional maupun internasional)\r\nMISI(1. Mengembangkan organisasi dan manajemen, tenaga kependidikan dan non kependidikan serta fasilitas konstitusi sesuai dengan kebutuhan jaman 2. Menyiapkan tenaga yang berkompetensi di bidangnya,mandiri,kreatif. 3. Menggalang kerjasama dengan institusi yang terkait didalam dan luar negeri. 4. Memberi layanan prima)\r\n\r\nJURUSAN : Patiseri, Garmen, Akomodasi Perhotelan, Busana Butik, Tata Kecantikan Kulit, Jasa Boga. ','Dra. SRI TJAHYONO WATIE, MM','Negeri','9001:2008',NULL,'1',-7.25337,112.746,'smkn8.jpg',NULL,NULL),(16,'SMK TARUNA SURABAYA','JL. ASEM RAYA NO.27 kecamatan asemrowo surabaya 60182','smktr_sby@yahoo.co.id','0315455442','B','www.SMKTarunaSurabaya.com','-','Liliana Melanie Amoe','Swasta','-',NULL,'0',-7.2518,112.713,'smk_taruna.jpg',NULL,NULL),(17,'SMKN 5 SURABAYA','Jl. MAYJEND Prf Dr MOESTOPO 167-169 SURABAYA Kecamatan : Kec. Gubeng Desa/kel : mojo Surabaya 60285','stemba5sby@gmail.com','0315934888','A','www.smkn5-sby.sch.id','VISI->Membentuk sekolah kejuruan yang bertaraf internasional dalam bidang teknologi yang berbasis lingkungan guna memenuhi permintaan pasar global.\r\nMISI->1 Mencetak lulusan yang profesional yang bertakwa kepada Tuhan Yang Maha Esa sesuai dengan tuntutan pasar global\r\n2 Membekali siswa dengan keterampilan dan kompetensi yang berstandart internasional yang mampu mendorong mereka untuk menggunakan kemampuan mereka secara maksimal dalam menciptakan lapangan pekerjaan maupun melanjutkan pendidikan.\r\n3 Membekali siswa dengan ilmu dan pengetahuan berbasis lingkungan.\r\n\r\nJURUSAN : Kimia Analisis,Kimia Industri,Teknik Kendaraan Ringan,Teknik Pemesinan,Teknik Instalasi Tenaga Listrik,Teknik Audio Video,Teknik Gambar Bangunan.\r\n','Dra. Hj. Tatik Kustini, MM','Negeri','9001:2008',NULL,'3',-7.26505,112.769,'smkn5.jpg',NULL,NULL),(18,'SMKN 10 SURABAYA','Jl. KEPUTIH TEGAL SURABAYA Kec. Sukolilo kel : Keputih Surabaya 60111 ','info@smkn10surabaya.sch.id','0315939581','A','www.smkn10surabaya.sch.id','VISI(Menjadi SMK Berprestasi untuk menghasilkan tamatan yang beriman dan bertakwa,berdaya saing global,unggul, serta berwawasan lingkungan hidup)\r\n\r\nJURUSAN : multimedia, Usaha Perjalanan Wisata, Perbankan,pemasaran, Administrasi Perkantoran,akuntansi','Dra. Hj. Anisah, MPd','Negeri','9001:2008',NULL,'3',-7.29326,112.8,'smkn10.jpg',NULL,NULL),(19,'SMK IKIP SURABAYA','JL. KAWUNG NO. 9 SURABAYA','smkikipsby@gmail.com','031313535422','B','www.smkikipsby.sch.id','VISI->Menjadi sekolah berwawasan IMTAQ dan IPTEK sehingga dapat selalu mengikuti perkembangan dunia usaha\r\nMISI->Menghasilkan lulusan yang terlatih,terampil,dan kompeten serta bermoral dan bertaqwa sehingga dapat bersaing di dunia kerja dan masyarakat\r\n\r\nJurusan : multimedia','Dian widyastuti','Swasta','-',NULL,'4',-7.23502,112.73,'smk_ikip.jpg',NULL,NULL),(24,'smkn 3 wwww surabaya','jl. oooooooooo','kjh@g.com','0316456987','A','www.xxxx.con','xxxxxxxxxxxxxxxxxxxxxx\r\nxxxxxxxxxxxxxxxxxxxxxxxxxxxx','Drs. Budi','Negeri','asasas23232323',NULL,'1',-7.33682,112.716,NULL,'2017-07-24 10:31:09','2017-07-24 10:31:09'),(30,'smkn 100 sby','x','sa@co.id','12','A','qw','w','qw','Swasta','qw',NULL,'0',1,1,'sa@co.id2017-07-24 14-49-13.png','2017-07-24 14:49:13','2017-07-24 14:49:13');

/*Table structure for table `sekolah_likes` */

DROP TABLE IF EXISTS `sekolah_likes`;

CREATE TABLE `sekolah_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waktu` datetime DEFAULT NULL,
  `id_sekolah` int(11) DEFAULT NULL,
  `id_user` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rating_user_id` (`id_user`),
  KEY `fk_rating_id_sekolah` (`id_sekolah`),
  CONSTRAINT `fk_rating_id_sekolah` FOREIGN KEY (`id_sekolah`) REFERENCES `sekolah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rating_user_id` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

/*Data for the table `sekolah_likes` */

insert  into `sekolah_likes`(`id`,`waktu`,`id_sekolah`,`id_user`,`created_at`,`updated_at`) values (5,'2017-07-04 13:19:37',9,'dani',NULL,NULL),(16,'2017-07-12 21:30:26',14,'balkhis','2017-07-12 21:30:26','2017-07-12 21:30:26'),(35,'2017-07-17 02:32:19',9,'untag','2017-07-17 02:32:19','2017-07-17 02:32:19'),(37,'2017-07-17 03:51:51',11,'untag','2017-07-17 03:51:51','2017-07-17 03:51:51'),(39,'2017-07-17 04:06:43',15,'balkhis','2017-07-17 04:06:43','2017-07-17 04:06:43'),(40,'2017-07-19 07:39:19',16,'balkhis','2017-07-19 07:39:19','2017-07-19 07:39:19'),(41,'2017-07-20 16:27:40',13,'untag','2017-07-20 16:27:40','2017-07-20 16:27:40'),(42,'2017-07-23 04:35:20',10,'balkhis','2017-07-23 04:35:20','2017-07-23 04:35:20'),(43,'2017-07-23 10:28:02',18,'balkhis','2017-07-23 10:28:02','2017-07-23 10:28:02'),(46,'2017-07-24 14:49:48',30,'balkhis','2017-07-24 14:49:48','2017-07-24 14:49:48'),(47,'2017-07-24 15:43:18',11,'balkhis','2017-07-24 15:43:18','2017-07-24 15:43:18'),(48,'2017-07-24 15:49:52',9,'balkhis','2017-07-24 15:49:52','2017-07-24 15:49:52'),(49,'2017-07-26 13:06:16',12,'balkhis','2017-07-26 13:06:16','2017-07-26 13:06:16'),(50,'2017-07-26 13:17:11',19,'balkhis','2017-07-26 13:17:11','2017-07-26 13:17:11');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` varchar(20) NOT NULL,
  `password` varchar(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `nama` varchar(30) DEFAULT NULL,
  `nik` char(16) DEFAULT NULL,
  `tempat_lahir` varchar(30) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `kelamin` char(1) DEFAULT NULL,
  `pekerjaan` varchar(50) DEFAULT NULL,
  `alamat_lengkap` text,
  `tlp` varchar(20) DEFAULT NULL,
  `foto` varchar(30) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user` */

insert  into `user`(`id`,`password`,`email`,`nama`,`nik`,`tempat_lahir`,`tgl_lahir`,`kelamin`,`pekerjaan`,`alamat_lengkap`,`tlp`,`foto`,`last_login`,`created_at`,`updated_at`) values ('balkhis','777','balkhiswp@gmail.com','balkhis wanaputri','4565421565456123','Nabire','1998-11-20','0','Wiraswasta','Jl. Raden Shaleh No.58 Nabire, Papua','081365456565',NULL,'2017-09-20 13:31:53','2017-07-10 17:03:09','2017-07-26 13:38:01'),('dani','123','x@x.xx','dani faton XYZ','2424244242424','sby','2017-05-10','1','Fotografer','xxxxxxxxxxxxxxx','23444444444',NULL,'2017-07-09 02:44:40','2017-06-10 15:58:12','2017-07-04 02:12:49'),('dian','123','x@x.xx','dani faton X','2424244242424','sby','2017-05-10','1','Pilot','xxxxxxxxxxxxxxx','23444444444',NULL,'2017-07-10 02:05:26','2017-06-10 15:58:12','2017-06-25 01:27:22'),('indra','1234','indra@gmail.com','indra xxx','1819976599922273','surabaya','2016-12-04','1','wiraswasta','jl. xxxzxx x x x x x x z x','098765487654',NULL,'2017-07-23 13:42:56','2017-07-23 13:40:34','2017-07-23 13:40:34'),('kiwil','101','kkk@j.com','kiwil xxx','9393903','kskskx','2017-07-29','1','pns','jl. mdmmdkd','09737',NULL,'2017-07-26 13:45:45','2017-07-26 13:42:30','2017-07-26 13:42:30'),('kus','12345678','kus@g.com','kus hendratmoko','124445677777777','Surabaya','1995-07-28','1','Mahasiswa','jl. xxxxxxxxxx x x x x x xxxx Surabaya','1234659878',NULL,'2017-07-12 17:53:55','2017-07-12 12:42:11','2017-07-12 15:38:31'),('rendy','999','akakka@g.com','rendy okee','0119191919','malang','2017-05-14','1','PNS','jl. m m mm m m m m','91726949474',NULL,'2017-07-20 16:31:58','2017-07-20 16:30:55','2017-07-20 16:30:55'),('untag','111','untag@g.com','untag 1945 sby','9191911991','jakarta','2017-07-29','0','pns xxx','jl. xxxx x x x xmm m m m m','09828393',NULL,'2017-07-20 16:30:00','2017-07-17 02:30:13','2017-07-20 16:27:04');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
