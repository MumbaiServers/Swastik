-- MySQL dump 10.13  Distrib 9.1.0, for macos14 (arm64)
--
-- Host: localhost    Database: swastik_cms
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('c8c2165b-3356-4dd2-b5e0-3e7f84e5bbe6','82c416c101ec565d14d1dc7873fc24eacd42d494e3b4a06ea5155c324543abed','2026-02-21 06:09:44.820','20260221060944_add_loyalty_submissions',NULL,NULL,'2026-02-21 06:09:44.700',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin@swastikgroup.com','$2a$12$0WJMFvJRZAcveIyGPgrXZ.6Mj8BTJEM/LI3YonYO3nWOUjGPkEkWW','Swastik Admin','admin',1,'2026-02-21 06:09:46.743','2026-02-21 06:09:46.743');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Admin',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `views` int NOT NULL DEFAULT '0',
  `publishDate` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blogs_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'h','hh','hhh','The actual body of the article.\r\narticleSection	Text	Articles may belong to one or more \'sections\' in a magazine or newspaper, such as Sports, Lifestyle, etc.\r\nbackstory	CreativeWork  or\r\nText	For an Article, typically a NewsArticle, the backstory property provides a textual summary giving a brief explanation of why and how an article was created. In a journalistic setting this could include information about reporting process, methods, interviews, data sources, etc.\r\npageEnd	Integer  or\r\nText	The page on which the work ends; for example \"138\" or \"xvi\".\r\npageStart	Integer  or\r\nText	The page on which the work starts; for example \"135\" or \"xiii\".\r\npagination	Text	Any description of pages that is not separated into pageStart and pageEnd; for example, \"1-6, 9, 55\" or \"10-12, 46-49\".\r\nspeakable	SpeakableSpecification  or\r\nURL	Indicates sections of a Web page that are particularly \'speakable\' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the \'speakable\' property serves to indicate the parts most likely to be generally useful for speech.\r\n\r\nThe speakable property can be repeated an arbitrary number of times, with three kinds of possible \'content-locator\' values:\r\n\r\n1.) id-value URL references - uses id-value of an element in the page being annotated. The simplest use of speakable has (potentially relative) URL values, referencing identified sections of the document concerned.\r\n\r\n2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the cssSelector property.\r\n\r\n3.) XPaths - addresses content via XPaths (assuming an XML view of the content). Use the xpath property.\r\n\r\nFor more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, SpeakableSpecification which is defined to be a possible value of the speakable property.\r\nwordCount	Integer	The number of words in the text of the CreativeWork such as an Article, Book, etc.\r\nProperties from CreativeWork\r\nabout	Thing	The subject matter of an object.\r\nInverse property: subjectOf\r\nabstract	Text	An abstract is a short description that summarizes a CreativeWork.\r\naccessMode	Text	The human sensory perceptual system or cognitive faculty through which a person may process or perceive information. Values should be drawn from the approved vocabulary.\r\naccessModeSufficient	ItemList	A list of single or combined accessModes that are sufficient to understand all the intellectual content of a resource. Values should be drawn from the approved vocabulary.\r\naccessibilityAPI	Text	Indicates that the resource is compatible with the referenced accessibility API. Values should be drawn from the approved vocabulary.\r\naccessibilityControl	Text	Identifies input methods that are sufficient to fully control the described resource. Values should be drawn from the approved vocabulary.\r\naccessibilityFeature	Text	Content features of the resource, such as accessible media, alternatives and supported enhancements for accessibility. Values should be drawn from the approved vocabulary.\r\naccessibilityHazard	Text	A characteristic of the described resource that is physiologically dangerous to some users. Related to WCAG 2.0 guideline 2.3. Values should be drawn from the approved vocabulary.\r\naccessibilitySummary	Text	A human-readable summary of specific accessibility features or deficiencies, consistent with the other accessibility metadata but expressing subtleties such as \"short descriptions are present but long descriptions will be needed for non-visual users\" or \"short descriptions are present and no long descriptions are needed\".\r\naccountablePerson	Person	Specifies the Person that is legally accountable for the CreativeWork.\r\nacquireLicensePage	CreativeWork  or\r\nURL	Indicates a page documenting how licenses can be purchased or otherwise acquired, for the current item.\r\naggregateRating	AggregateRating	The overall rating, based on a collection of reviews or ratings, of the item.\r\nalternativeHeadline	Text	A secondary title of the CreativeWork.\r\narchivedAt	URL  or\r\nWebPage	Indicates a page or other link involved in archival of a CreativeWork. In the case of MediaReview, the items in a MediaReviewItem may often become inaccessible, but be archived by archival, journalistic, activist, or law enforcement organizations. In such cases, the referenced page may not directly publish the content.\r\nassesses	DefinedTerm  or\r\nText	The item being described is intended to assess the competency or learning outcome defined by the referenced term.\r\nassociatedMedia	MediaObject	A media object that encodes this CreativeWork. This property is a synonym for encoding.\r\naudience	Audience	An intended audience, i.e. a group for whom something was created. Supersedes serviceAudience.\r\naudio	AudioObject  or\r\nClip  or\r\nMusicRecording	An embedded audio object.\r\nauthor	Organization  or\r\nPerson	The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably.\r\naward	Text	An award won by or for this item. Supersedes awards.\r\ncharacter	Person	Fictional person connected with a creative work.\r\ncitation	CreativeWork  or\r\nText	A citation or reference to another creative work, such as another publication, web page, scholarly article, etc.\r\ncomment	Comment	Comments, typically from users.\r\ncommentCount	Integer	The number of comments this CreativeWork (e.g. Article, Question or Answer) has received. This is most applicable to works published in Web sites with commenting system; additional comments may exist elsewhere.\r\nconditionsOfAccess	Text	Conditions that affect the availability of, or method(s) of access to, an item. Typically used for real world items such as an ArchiveComponent held by an ArchiveOrganization. This property is not suitable for use as a general Web access control mechanism. It is expressed only in natural language.\r\n\r\nFor example \"Available by appointment from the Reading Room\" or \"Accessible only from logged-in accounts \".\r\ncontentLocation	Place	The location depicted or described in the content. For example, the location in a photograph or painting.\r\ncontentRating	Rating  or\r\nText	Official rating of a piece of content—for example, \'MPAA PG-13\'.\r\ncontentReferenceTime	DateTime	The specific time described by a creative work, for works (e.g. articles, video objects etc.) that emphasise a particular moment within an Event.\r\ncontributor	Organization  or\r\nPerson	A secondary contributor to the CreativeWork or Event.\r\ncopyrightHolder	Organization  or\r\nPerson	The party holding the legal copyright to the CreativeWork.\r\ncopyrightNotice	Text	Text of a notice appropriate for describing the copyright aspects of this Creative Work, ideally indicating the owner of the copyright for the Work.\r\ncopyrightYear	Number	The year during which the claimed copyright for the CreativeWork was first asserted.\r\ncorrection	CorrectionComment  or\r\nText  or\r\nURL	Indicates a correction to a CreativeWork, either via a CorrectionComment, textually or in another document.\r\ncountryOfOrigin	Country	The country of origin of something, including products as well as creative works such as movie and TV content.\r\n\r\nIn the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of CreativeWork it is difficult to provide fully general guidance, and properties such as contentLocation and locationCreated may be more applicable.\r\n\r\nIn the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot b',NULL,'Admin','published',6,'2026-02-03 00:00:00.000','2026-02-22 17:59:24.896','2026-02-23 09:06:52.033'),(8,'TEST-3','TEST','TEST','ASDHCAJSDCBAHJSCAD',NULL,'Admin','published',0,NULL,'2026-02-23 07:35:21.683','2026-02-23 07:48:13.800');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'What types of properties does Swastik Group offer?','test-2',NULL,0,1,'2026-02-21 06:09:46.784','2026-02-22 18:41:51.081'),(2,'Where are your projects located?','Our projects are located across prime locations in Mumbai including Ghatkopar, Chembur, Vikhroli, Mulund, Powai, and Andheri.',NULL,1,1,'2026-02-21 06:09:46.784','2026-02-21 06:09:46.784'),(3,'What is the payment process?','We offer flexible payment plans. Please contact our sales team for detailed information on payment schedules and financing options.',NULL,2,1,'2026-02-21 06:09:46.784','2026-02-21 06:09:46.784');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature_cards`
--

DROP TABLE IF EXISTS `feature_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature_cards`
--

LOCK TABLES `feature_cards` WRITE;
/*!40000 ALTER TABLE `feature_cards` DISABLE KEYS */;
INSERT INTO `feature_cards` VALUES (9,'home','Timely Delivery','hi',NULL,0,1,'2026-02-23 08:57:41.022','2026-02-23 08:57:41.022'),(10,'home','Professional Team','Our experienced team always aims for excellence, from planning projects to helping customers.',NULL,1,1,'2026-02-23 08:57:41.022','2026-02-23 08:57:41.022'),(11,'home','Market Leadership','We\'re leaders in redevelopment, known for quality work, on-time delivery, and being open with customers and partners.',NULL,2,1,'2026-02-23 08:57:41.022','2026-02-23 08:57:41.022'),(12,'home','Minimal Bureaucracy','Our simple processes and 24/7 help make things easy for clients, creating a friendly and supportive atmosphere.',NULL,3,1,'2026-02-23 08:57:41.022','2026-02-23 08:57:41.022');
/*!40000 ALTER TABLE `feature_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_banners`
--

DROP TABLE IF EXISTS `hero_banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtext` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `backgroundImage` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `image1536` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image1920` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image2560` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageMobile` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_banners`
--

LOCK TABLES `hero_banners` WRITE;
/*!40000 ALTER TABLE `hero_banners` DISABLE KEYS */;
INSERT INTO `hero_banners` VALUES (1,'Find Your Dream Home Today','Discover premium residential properties in Mumbai\'s most sought-after locations',NULL,1,'2026-02-21 06:09:46.748','2026-02-21 06:09:46.748',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `hero_banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `projectId` int DEFAULT NULL,
  `source` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'new',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `mapUrl` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (7,'Chembur',NULL,NULL,0,1,'2026-02-21 06:19:23.660','2026-02-21 06:19:23.660'),(8,'Ghatkopar',NULL,NULL,1,1,'2026-02-21 06:19:23.660','2026-02-21 06:19:23.660'),(9,'Vikhroli',NULL,NULL,2,1,'2026-02-21 06:19:23.660','2026-02-21 06:19:23.660'),(10,'Andheri',NULL,NULL,3,1,'2026-02-21 06:19:23.660','2026-02-21 06:19:23.660');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loyalty_submissions`
--

DROP TABLE IF EXISTS `loyalty_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loyalty_submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactNumber` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refereeName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refereeContact` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preferredUnit` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loyalty_submissions`
--

LOCK TABLES `loyalty_submissions` WRITE;
/*!40000 ALTER TABLE `loyalty_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `loyalty_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `originalName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mimeType` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `altText` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploadedBy` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_amenities`
--

DROP TABLE IF EXISTS `project_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectId` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'podium',
  `sortOrder` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_amenities_projectId_fkey` (`projectId`),
  CONSTRAINT `project_amenities_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_amenities`
--

LOCK TABLES `project_amenities` WRITE;
/*!40000 ALTER TABLE `project_amenities` DISABLE KEYS */;
INSERT INTO `project_amenities` VALUES (61,1,'Premier Gymnasium','podium',0),(62,1,'Children\'s Play Area','podium',1),(63,1,'Day Care','podium',2),(64,1,'Indoor Games','podium',3),(65,1,'Mini Theater','podium',4),(66,1,'Reading Area','podium',5),(67,1,'Gaming Zone','rooftop',6),(68,1,'Elder\'s Lounge','podium',7),(69,1,'Kids Pool','podium',8),(70,1,'Pantry','podium',9),(71,1,'Banquet Hall','podium',10),(72,1,'Guest Rooms','podium',11);
/*!40000 ALTER TABLE `project_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_configurations`
--

DROP TABLE IF EXISTS `project_configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_configurations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectId` int NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_configurations_projectId_fkey` (`projectId`),
  CONSTRAINT `project_configurations_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_configurations`
--

LOCK TABLES `project_configurations` WRITE;
/*!40000 ALTER TABLE `project_configurations` DISABLE KEYS */;
INSERT INTO `project_configurations` VALUES (16,1,'1 BHK','418 RCA Sq. Ft','Click for price',0,NULL),(17,1,'2 BHK','554 RCA Sq. Ft','Click for price',1,NULL),(18,1,'3 BHK','746 RCA Sq. Ft','Click for price',2,NULL);
/*!40000 ALTER TABLE `project_configurations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_connectivities`
--

DROP TABLE IF EXISTS `project_connectivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_connectivities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectId` int NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_connectivities_projectId_fkey` (`projectId`),
  CONSTRAINT `project_connectivities_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_connectivities`
--

LOCK TABLES `project_connectivities` WRITE;
/*!40000 ALTER TABLE `project_connectivities` DISABLE KEYS */;
INSERT INTO `project_connectivities` VALUES (21,1,'Eastern Express Highway - 5 mins',0),(22,1,'Ghatkopar Railway Station - 10 mins',1),(23,1,'Metro Station - 8 mins',2),(24,1,'R City Mall - 12 mins',3);
/*!40000 ALTER TABLE `project_connectivities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_gallery_images`
--

DROP TABLE IF EXISTS `project_gallery_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_gallery_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectId` int NOT NULL,
  `imageUrl` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_gallery_images_projectId_fkey` (`projectId`),
  CONSTRAINT `project_gallery_images_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_gallery_images`
--

LOCK TABLES `project_gallery_images` WRITE;
/*!40000 ALTER TABLE `project_gallery_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_gallery_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullDescription` longtext COLLATE utf8mb4_unicode_ci,
  `configuration` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ongoing',
  `tag` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maharera` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `googleMapsUrl` text COLLATE utf8mb4_unicode_ci,
  `disclaimer` text COLLATE utf8mb4_unicode_ci,
  `financeBy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mahareraQr` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mahareraUrl` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `floorPlanImage` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `connectivitiesDescription` text COLLATE utf8mb4_unicode_ci,
  `aboutDeveloperImage` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aboutDeveloperText` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'swastik-pearl','Swastik Pearl','Residential','Ghatkopar West','Starting at ₹70 Lakhs*',NULL,'Luxury residential complex with modern amenities','TEST-5','1,2,3 BHK','ongoing','Enquiry Now','P51800045216',0,1,'2026-02-21 06:09:46.780','2026-02-23 09:01:26.210','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.1039278894073!2d73.03968697521975!3d19.01514155388025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c300249d159f%3A0x6c6f1d746eb6b81b!2sMaruti%20Tower%20CHS!5e0!3m2!1sen!2sin!4v1771786879055!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','hihihihihihi','',NULL,'',NULL,'',NULL,'hihihiihihihih hello'),(2,'test-2','test-2',NULL,'Mumbai',NULL,NULL,'hhhh','jajsxbjasx',NULL,'completed',NULL,NULL,0,1,'2026-02-23 06:59:38.934','2026-02-23 10:27:10.421',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sectionKey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extraData` longtext COLLATE utf8mb4_unicode_ci,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sections_sectionKey_key` (`sectionKey`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'who_we_are','Who we are?','hahhahahasvcasudcbagvdcan dicvwadciv acvsagdcvadc.',NULL,NULL,1,1,'2026-02-21 06:09:46.751','2026-02-22 18:51:38.455'),(2,'our_business','Our Business','Swastik Group is a prime real estate company. We are known for our honesty, transparency, and the best. Premium quality work. As we\'ve been working around for more than 25 years and creating amazing homes a hello',NULL,NULL,2,1,'2026-02-21 06:09:46.753','2026-02-22 17:06:00.744'),(3,'about_us','About Us','At Swastik Group, we\'re dedicated to honesty, openness, and quality work in each single thing we do. We\'ve successfully completed various projects that blend contemporary design with luxury. We\'re proud to build durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to top expectations and leave a positive mark in the communities we serve.',NULL,NULL,3,1,'2026-02-21 06:09:46.754','2026-02-21 06:09:46.754'),(4,'about_developer','About Developer','At Swastik Group, we\'re dedicated to honesty, openness, and quality work in each single thing we do. We\'ve successfully completed various projects that blend contemporary design with luxury. We\'re proud to build durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to top expectations and leave a positive mark in the communities we serve.',NULL,NULL,4,1,'2026-02-21 06:09:46.755','2026-02-21 06:09:46.755'),(5,'watch_our_story','Watch Our Story','Discover our journey in creating exceptional real estate experiences',NULL,'https://www.youtube.com/embed/WUq4bKwC-nM?si=sBQAjI_kCXg4-Qwb',5,1,'2026-02-21 06:09:46.756','2026-02-21 06:09:46.756'),(6,'about_us_main','About Us','At Swastik Group, we\'re dedicated to honesty, openness, and quality work in each single thing we do. We\'ve successfully completed various projects that blend contemporary design with luxury. We\'re proud to build durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to top expectations and leave a positive mark in the communities we serve.',NULL,NULL,3,1,'2026-02-22 16:51:30.199','2026-02-22 17:06:00.756'),(7,'footer_info','Footer Information','312, Swastik DSK Corporate Park 6A,',NULL,'{\"corporateName\":\"SWASTIK BUILDERS AND DEVELOPERS LLP\",\"addressLine1\":\"312, Swastik DSK Corporate Park 6A,\",\"addressLine2\":\"Mingra Opp. Shreeyes Cinema,\",\"addressLine3\":\"Ghatkopar West, Mumbai 400086, INDIA\",\"phone\":\"+91-22-6589 0000\",\"email\":\"sales@swastikgroup.in\",\"copyright\":\"Copyright 2026 | All Rights Reserved By Swastik Group\",\"developer\":\"Developed by Signature Advertising\",\"instagram\":\"https://facebook.com/swastikgroup\",\"facebook\":\"https://facebook.com/swastikgroup\",\"linkedin\":\"https://facebook.com/swastikgroup\",\"youtube\":\"https://facebook.com/swastikgroup\"}',0,1,'2026-02-23 09:29:43.633','2026-02-23 09:36:23.946');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_media_links`
--

DROP TABLE IF EXISTS `social_media_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_media_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `platform` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_media_links`
--

LOCK TABLES `social_media_links` WRITE;
/*!40000 ALTER TABLE `social_media_links` DISABLE KEYS */;
INSERT INTO `social_media_links` VALUES (1,'facebook','https://facebook.com/swastikgroup',NULL,1,0,'2026-02-21 06:09:46.777','2026-02-21 06:09:46.777'),(2,'instagram','https://instagram.com/swastikgroup',NULL,1,1,'2026-02-21 06:09:46.777','2026-02-21 06:09:46.777'),(3,'linkedin','https://linkedin.com/company/swastikgroup',NULL,1,2,'2026-02-21 06:09:46.777','2026-02-21 06:09:46.777'),(4,'youtube','https://youtube.com/swastikgroup',NULL,1,3,'2026-02-21 06:09:46.777','2026-02-21 06:09:46.777');
/*!40000 ALTER TABLE `social_media_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_media_posts`
--

DROP TABLE IF EXISTS `social_media_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_media_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `platform` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instagram',
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_media_posts`
--

LOCK TABLES `social_media_posts` WRITE;
/*!40000 ALTER TABLE `social_media_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_media_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suffix` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `statistics_key_key` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
INSERT INTO `statistics` VALUES (1,'years_of_experience','Years of Experience','12','+',0,1,'2026-02-21 06:09:46.767','2026-02-22 18:24:27.470'),(2,'sq_ft_developed','Million sq. ft. developed','1.5',NULL,1,1,'2026-02-21 06:09:46.769','2026-02-22 18:24:27.470'),(3,'happy_families','Happy Families','1500','+',2,1,'2026-02-21 06:09:46.770','2026-02-22 18:24:27.470'),(4,'sq_ft_ongoing','Lakh sq. ft. ongoing','121',NULL,3,1,'2026-02-21 06:09:46.771','2026-02-22 18:24:27.470'),(5,'projects_completed','Projects are completed','22',NULL,4,1,'2026-02-21 06:09:46.772','2026-02-22 18:24:27.470'),(6,'projects_ongoing','Projects which are ongoing','7',NULL,5,1,'2026-02-21 06:09:46.773','2026-02-22 18:24:27.470');
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `values_vision_mission`
--

DROP TABLE IF EXISTS `values_vision_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `values_vision_mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `values_vision_mission`
--

LOCK TABLES `values_vision_mission` WRITE;
/*!40000 ALTER TABLE `values_vision_mission` DISABLE KEYS */;
INSERT INTO `values_vision_mission` VALUES (1,'values','Our Values','Integrity, transparency, and excellence form the foundation of everything we do.',NULL,1,1,'2026-02-21 06:09:46.758','2026-02-23 12:34:24.994'),(2,'vision','Our Vision','To be Mumbai\'s most trusted real estate developer, creating sustainable communities.',NULL,2,1,'2026-02-21 06:09:46.760','2026-02-23 12:34:25.011'),(3,'mission','Our Mission','Building quality homes that blend contemporary design with innovation and sustainability.',NULL,3,1,'2026-02-21 06:09:46.761','2026-02-23 12:34:25.014');
/*!40000 ALTER TABLE `values_vision_mission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-25 15:03:52
