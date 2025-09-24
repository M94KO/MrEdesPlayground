import { Category, Exercise, Word } from '@/types/lesson';

const alphabetWords: Word[] = [
  { id: 'alph1', yoruba: 'A', english: 'A (as in "father")', pronunciation: 'ah' },
  { id: 'alph2', yoruba: 'B', english: 'B (as in "boy")', pronunciation: 'beh' },
  { id: 'alph3', yoruba: 'D', english: 'D (as in "dog")', pronunciation: 'deh' },
  { id: 'alph4', yoruba: 'E', english: 'E (as in "bed")', pronunciation: 'eh' },
  { id: 'alph5', yoruba: 'Ẹ', english: 'Ẹ (open E, as in "get")', pronunciation: 'eh (open)' },
  { id: 'alph6', yoruba: 'F', english: 'F (as in "fish")', pronunciation: 'feh' },
  { id: 'alph7', yoruba: 'G', english: 'G (as in "go")', pronunciation: 'geh' },
  { id: 'alph8', yoruba: 'GB', english: 'GB (labial-velar stop)', pronunciation: 'gbeh' },
  { id: 'alph9', yoruba: 'H', english: 'H (as in "house")', pronunciation: 'heh' },
  { id: 'alph10', yoruba: 'I', english: 'I (as in "machine")', pronunciation: 'ee' },
  { id: 'alph11', yoruba: 'J', english: 'J (as in "yes")', pronunciation: 'jeh' },
  { id: 'alph12', yoruba: 'K', english: 'K (as in "kite")', pronunciation: 'keh' },
  { id: 'alph13', yoruba: 'L', english: 'L (as in "love")', pronunciation: 'leh' },
  { id: 'alph14', yoruba: 'M', english: 'M (as in "mother")', pronunciation: 'meh' },
  { id: 'alph15', yoruba: 'N', english: 'N (as in "no")', pronunciation: 'neh' },
  { id: 'alph16', yoruba: 'O', english: 'O (as in "more")', pronunciation: 'oh' },
  { id: 'alph17', yoruba: 'Ọ', english: 'Ọ (open O, as in "thought")', pronunciation: 'aw' },
  { id: 'alph18', yoruba: 'P', english: 'P (as in "pen")', pronunciation: 'peh' },
  { id: 'alph19', yoruba: 'R', english: 'R (rolled R)', pronunciation: 'reh' },
  { id: 'alph20', yoruba: 'S', english: 'S (as in "sun")', pronunciation: 'seh' },
  { id: 'alph21', yoruba: 'Ṣ', english: 'Ṣ (as in "shoe")', pronunciation: 'sheh' },
  { id: 'alph22', yoruba: 'T', english: 'T (as in "top")', pronunciation: 'teh' },
  { id: 'alph23', yoruba: 'U', english: 'U (as in "moon")', pronunciation: 'oo' },
  { id: 'alph24', yoruba: 'W', english: 'W (as in "water")', pronunciation: 'weh' },
  { id: 'alph25', yoruba: 'Y', english: 'Y (as in "yes")', pronunciation: 'yeh' },
];

const toneWords: Word[] = [
  { id: 'tone1', yoruba: 'á', english: 'High tone (rising pitch)', pronunciation: 'ah (high)' },
  { id: 'tone2', yoruba: 'à', english: 'Low tone (falling pitch)', pronunciation: 'ah (low)' },
  { id: 'tone3', yoruba: 'a', english: 'Mid tone (neutral pitch)', pronunciation: 'ah (mid)' },
  { id: 'tone4', yoruba: 'bá', english: 'High tone example: "to meet"', pronunciation: 'bah (high)' },
  { id: 'tone5', yoruba: 'bà', english: 'Low tone example: "to perch"', pronunciation: 'bah (low)' },
  { id: 'tone6', yoruba: 'ba', english: 'Mid tone example: "to come"', pronunciation: 'bah (mid)' },
  { id: 'tone7', yoruba: 'Tóbi', english: 'High-mid tone: "big"', pronunciation: 'toh-bee' },
  { id: 'tone8', yoruba: 'Tòbi', english: 'Low-mid tone: "push"', pronunciation: 'toh-bee (low-mid)' },
];

const pronunciationWords: Word[] = [
  { id: 'pron1', yoruba: 'Ẹ', english: 'Open E sound (like "get")', pronunciation: 'eh (open)' },
  { id: 'pron2', yoruba: 'Ọ', english: 'Open O sound (like "thought")', pronunciation: 'aw' },
  { id: 'pron3', yoruba: 'Ṣ', english: 'SH sound (like "shoe")', pronunciation: 'sh' },
  { id: 'pron4', yoruba: 'GB', english: 'Simultaneous G and B sound', pronunciation: 'gb' },
  { id: 'pron5', yoruba: 'KP', english: 'Simultaneous K and P sound', pronunciation: 'kp' },
  { id: 'pron6', yoruba: 'Yorùbá', english: 'The name of the language', pronunciation: 'yoh-roo-bah' },
  { id: 'pron7', yoruba: 'Ẹ káàárọ̀', english: 'Good morning (practice tones)', pronunciation: 'eh-kah-ah-raw' },
  { id: 'pron8', yoruba: 'Ẹ káalẹ́', english: 'Good evening (practice tones)', pronunciation: 'eh-kah-leh' },
];

const basicSoundsWords: Word[] = [
  { id: 'sound1', yoruba: 'Àá', english: 'Low-high tone pattern', pronunciation: 'ah-ah (low-high)' },
  { id: 'sound2', yoruba: 'Òó', english: 'Low-high tone pattern', pronunciation: 'oh-oh (low-high)' },
  { id: 'sound3', yoruba: 'Èé', english: 'Low-high tone pattern', pronunciation: 'eh-eh (low-high)' },
  { id: 'sound4', yoruba: 'Ìí', english: 'Low-high tone pattern', pronunciation: 'ee-ee (low-high)' },
  { id: 'sound5', yoruba: 'Ùú', english: 'Low-high tone pattern', pronunciation: 'oo-oo (low-high)' },
  { id: 'sound6', yoruba: 'Ẹ̀ẹ́', english: 'Open E: low-high pattern', pronunciation: 'eh-eh (open, low-high)' },
  { id: 'sound7', yoruba: 'Ọ̀ọ́', english: 'Open O: low-high pattern', pronunciation: 'aw-aw (low-high)' },
  { id: 'sound8', yoruba: 'Bí', english: 'How/if (high tone)', pronunciation: 'bee (high)' },
  { id: 'sound9', yoruba: 'Bì', english: 'To give birth (low tone)', pronunciation: 'bee (low)' },
  { id: 'sound10', yoruba: 'Kí', english: 'What (high tone)', pronunciation: 'kee (high)' },
];

const greetingsWords: Word[] = [
  { id: '1', yoruba: 'Ẹ káàárọ̀', english: 'Good morning', pronunciation: 'eh-kah-ah-raw' },
  { id: '2', yoruba: 'Ẹ káàsán', english: 'Good afternoon', pronunciation: 'eh-kah-sahn' },
  { id: '3', yoruba: 'Ẹ káalẹ́', english: 'Good evening', pronunciation: 'eh-kah-leh' },
  { id: '4', yoruba: 'O dàárọ̀', english: 'Good night', pronunciation: 'oh-dah-raw' },
  { id: '5', yoruba: 'Báwo ni?', english: 'How are you?', pronunciation: 'bah-woh-nee' },
  { id: '6', yoruba: 'Mo wà pá', english: 'I am fine', pronunciation: 'moh-wah-pah' },
  { id: '7', yoruba: 'Ẹ ṣé', english: 'Thank you', pronunciation: 'eh-sheh' },
  { id: '8', yoruba: 'Kò tọ́pẹ́', english: "You're welcome", pronunciation: 'koh-toh-peh' },
];

const numbersWords: Word[] = [
  { id: '9', yoruba: 'Ọ̀kan', english: 'One', pronunciation: 'oh-kahn' },
  { id: '10', yoruba: 'Èjì', english: 'Two', pronunciation: 'eh-jee' },
  { id: '11', yoruba: 'Ẹ̀ta', english: 'Three', pronunciation: 'eh-tah' },
  { id: '12', yoruba: 'Ẹ̀rin', english: 'Four', pronunciation: 'eh-reen' },
  { id: '13', yoruba: 'Àrún', english: 'Five', pronunciation: 'ah-roon' },
  { id: '14', yoruba: 'Ẹ̀fà', english: 'Six', pronunciation: 'eh-fah' },
  { id: '15', yoruba: 'Èje', english: 'Seven', pronunciation: 'eh-jeh' },
  { id: '16', yoruba: 'Ẹ̀jọ', english: 'Eight', pronunciation: 'eh-jaw' },
  { id: '17', yoruba: 'Ẹ̀sán', english: 'Nine', pronunciation: 'eh-sahn' },
  { id: '18', yoruba: 'Ẹ̀wá', english: 'Ten', pronunciation: 'eh-wah' },
];

const familyWords: Word[] = [
  { id: '19', yoruba: 'Bàbá', english: 'Father', pronunciation: 'bah-bah' },
  { id: '20', yoruba: 'Ìyá', english: 'Mother', pronunciation: 'ee-yah' },
  { id: '21', yoruba: 'Ọmọ', english: 'Child', pronunciation: 'oh-moh' },
  { id: '22', yoruba: 'Ẹ̀gbọ́n', english: 'Elder sibling', pronunciation: 'eh-bohn' },
  { id: '23', yoruba: 'Àbúrò', english: 'Younger sibling', pronunciation: 'ah-boo-roh' },
  { id: '24', yoruba: 'Ọkọ', english: 'Husband', pronunciation: 'oh-koh' },
  { id: '25', yoruba: 'Aya', english: 'Wife', pronunciation: 'ah-yah' },
];

const foodWords: Word[] = [
  { id: '26', yoruba: 'Oúnjẹ', english: 'Food', pronunciation: 'oh-oon-jeh' },
  { id: '27', yoruba: 'Omi', english: 'Water', pronunciation: 'oh-mee' },
  { id: '28', yoruba: 'Ẹ̀wà', english: 'Beans', pronunciation: 'eh-wah' },
  { id: '29', yoruba: 'Irẹsì', english: 'Rice', pronunciation: 'ee-reh-see' },
  { id: '30', yoruba: 'Iṣu', english: 'Yam', pronunciation: 'ee-shoo' },
  { id: '31', yoruba: 'Àgbàdo', english: 'Corn', pronunciation: 'ah-bah-doh' },
  { id: '32', yoruba: 'Ẹran', english: 'Meat', pronunciation: 'eh-rahn' },
];

const colorsWords: Word[] = [
  { id: '33', yoruba: 'Àwọ̀', english: 'Color', pronunciation: 'ah-woh' },
  { id: '34', yoruba: 'Funfun', english: 'White', pronunciation: 'foon-foon' },
  { id: '35', yoruba: 'Dúdú', english: 'Black', pronunciation: 'doo-doo' },
  { id: '36', yoruba: 'Pupa', english: 'Red', pronunciation: 'poo-pah' },
  { id: '37', yoruba: 'Aláwọ̀ ewé', english: 'Green', pronunciation: 'ah-lah-woh eh-weh' },
  { id: '38', yoruba: 'Bulúù', english: 'Blue', pronunciation: 'boo-loo' },
  { id: '39', yoruba: 'Ofeefee', english: 'Yellow', pronunciation: 'oh-feh-feh' },
  { id: '40', yoruba: 'Àlùkò', english: 'Purple', pronunciation: 'ah-loo-koh' },
];

const bodyPartsWords: Word[] = [
  { id: '41', yoruba: 'Orí', english: 'Head', pronunciation: 'oh-ree' },
  { id: '42', yoruba: 'Ojú', english: 'Eye', pronunciation: 'oh-joo' },
  { id: '43', yoruba: 'Imú', english: 'Nose', pronunciation: 'ee-moo' },
  { id: '44', yoruba: 'Ẹnu', english: 'Mouth', pronunciation: 'eh-noo' },
  { id: '45', yoruba: 'Etí', english: 'Ear', pronunciation: 'eh-tee' },
  { id: '46', yoruba: 'Ọwọ́', english: 'Hand', pronunciation: 'oh-woh' },
  { id: '47', yoruba: 'Ẹsẹ̀', english: 'Foot', pronunciation: 'eh-seh' },
  { id: '48', yoruba: 'Ara', english: 'Body', pronunciation: 'ah-rah' },
];

const animalsWords: Word[] = [
  { id: '49', yoruba: 'Ẹranko', english: 'Animal', pronunciation: 'eh-rahn-koh' },
  { id: '50', yoruba: 'Ajá', english: 'Dog', pronunciation: 'ah-jah' },
  { id: '51', yoruba: 'Ológbò', english: 'Cat', pronunciation: 'oh-loh-boh' },
  { id: '52', yoruba: 'Ẹṣin', english: 'Horse', pronunciation: 'eh-sheen' },
  { id: '53', yoruba: 'Màlúù', english: 'Cow', pronunciation: 'mah-loo' },
  { id: '54', yoruba: 'Àgùntàn', english: 'Sheep', pronunciation: 'ah-goon-tahn' },
  { id: '55', yoruba: 'Adìẹ', english: 'Chicken', pronunciation: 'ah-dee-eh' },
  { id: '56', yoruba: 'Ẹyẹ', english: 'Bird', pronunciation: 'eh-yeh' },
];

const weatherWords: Word[] = [
  { id: '57', yoruba: 'Ojú ọjọ́', english: 'Weather', pronunciation: 'oh-joo oh-joh' },
  { id: '58', yoruba: 'Òjò', english: 'Rain', pronunciation: 'oh-joh' },
  { id: '59', yoruba: 'Oòrùn', english: 'Sun', pronunciation: 'oh-oh-roon' },
  { id: '60', yoruba: 'Àwọsánmà', english: 'Cloud', pronunciation: 'ah-woh-sahn-mah' },
  { id: '61', yoruba: 'Afẹ́fẹ́', english: 'Wind', pronunciation: 'ah-feh-feh' },
  { id: '62', yoruba: 'Òtútù', english: 'Cold', pronunciation: 'oh-too-too' },
  { id: '63', yoruba: 'Gbígbóná', english: 'Hot', pronunciation: 'bee-boh-nah' },
];

const timeWords: Word[] = [
  { id: '64', yoruba: 'Àkókò', english: 'Time', pronunciation: 'ah-koh-koh' },
  { id: '65', yoruba: 'Ọjọ́', english: 'Day', pronunciation: 'oh-joh' },
  { id: '66', yoruba: 'Òru', english: 'Night', pronunciation: 'oh-roo' },
  { id: '67', yoruba: 'Àárọ̀', english: 'Morning', pronunciation: 'ah-ah-roh' },
  { id: '68', yoruba: 'Ọ̀sán', english: 'Afternoon', pronunciation: 'oh-sahn' },
  { id: '69', yoruba: 'Alẹ́', english: 'Evening', pronunciation: 'ah-leh' },
  { id: '70', yoruba: 'Ọ̀sẹ̀', english: 'Week', pronunciation: 'oh-seh' },
  { id: '71', yoruba: 'Oṣù', english: 'Month', pronunciation: 'oh-shoo' },
];

const clothingWords: Word[] = [
  { id: '72', yoruba: 'Aṣọ', english: 'Clothing', pronunciation: 'ah-shoh' },
  { id: '73', yoruba: 'Ẹ̀wù', english: 'Shirt', pronunciation: 'eh-woo' },
  { id: '74', yoruba: 'Ṣòkòtò', english: 'Trousers', pronunciation: 'shoh-koh-toh' },
  { id: '75', yoruba: 'Bàtà', english: 'Shoes', pronunciation: 'bah-tah' },
  { id: '76', yoruba: 'Fìlà', english: 'Hat', pronunciation: 'fee-lah' },
  { id: '77', yoruba: 'Gẹ̀lẹ̀', english: 'Head wrap', pronunciation: 'geh-leh' },
  { id: '78', yoruba: 'Agbádá', english: 'Traditional robe', pronunciation: 'ah-bah-dah' },
];

const personalDetailsWords: Word[] = [
  { id: '79', yoruba: 'Orúkọ', english: 'Name', pronunciation: 'oh-roo-koh' },
  { id: '80', yoruba: 'Orúkọ mi ni...', english: 'My name is...', pronunciation: 'oh-roo-koh mee nee' },
  { id: '81', yoruba: 'Kí ni orúkọ rẹ?', english: 'What is your name?', pronunciation: 'kee nee oh-roo-koh reh' },
  { id: '82', yoruba: 'Ọmọ orílẹ̀-èdè', english: 'Nationality', pronunciation: 'oh-moh oh-ree-leh-eh-deh' },
  { id: '83', yoruba: 'Nàìjíríà', english: 'Nigeria', pronunciation: 'nah-ee-jee-ree-ah' },
  { id: '84', yoruba: 'Ọmọ Nàìjíríà ni mi', english: 'I am Nigerian', pronunciation: 'oh-moh nah-ee-jee-ree-ah nee mee' },
  { id: '85', yoruba: 'Ọjọ́ orí', english: 'Age', pronunciation: 'oh-joh oh-ree' },
  { id: '86', yoruba: 'Ọdún mélòó ni ọ?', english: 'How old are you?', pronunciation: 'oh-doon meh-loh nee oh' },
];

const describingWords: Word[] = [
  { id: '87', yoruba: 'Tóbi', english: 'Big/Large', pronunciation: 'toh-bee' },
  { id: '88', yoruba: 'Kékeré', english: 'Small', pronunciation: 'keh-keh-reh' },
  { id: '89', yoruba: 'Gíga', english: 'Tall', pronunciation: 'gee-gah' },
  { id: '90', yoruba: 'Kúkúrú', english: 'Short', pronunciation: 'koo-koo-roo' },
  { id: '91', yoruba: 'Lẹ́wà', english: 'Beautiful', pronunciation: 'leh-wah' },
  { id: '92', yoruba: 'Rẹwà', english: 'Handsome', pronunciation: 'reh-wah' },
  { id: '93', yoruba: 'Dára', english: 'Good/Nice', pronunciation: 'dah-rah' },
  { id: '94', yoruba: 'Burúkú', english: 'Bad', pronunciation: 'boo-roo-koo' },
  { id: '95', yoruba: 'Tuntun', english: 'New', pronunciation: 'toon-toon' },
  { id: '96', yoruba: 'Àtijọ́', english: 'Old', pronunciation: 'ah-tee-joh' },
];

const possessionsWords: Word[] = [
  { id: '97', yoruba: 'Ohun-ìní', english: 'Possession', pronunciation: 'oh-hoon-ee-nee' },
  { id: '98', yoruba: 'Ilé', english: 'House', pronunciation: 'ee-leh' },
  { id: '99', yoruba: 'Ọkọ̀', english: 'Car', pronunciation: 'oh-koh' },
  { id: '100', yoruba: 'Kẹ̀kẹ́', english: 'Bicycle', pronunciation: 'keh-keh' },
  { id: '101', yoruba: 'Fóònù', english: 'Phone', pronunciation: 'foh-oh-noo' },
  { id: '102', yoruba: 'Àpò', english: 'Bag', pronunciation: 'ah-poh' },
  { id: '103', yoruba: 'Ìwé', english: 'Book', pronunciation: 'ee-weh' },
  { id: '104', yoruba: 'Owó', english: 'Money', pronunciation: 'oh-woh' },
  { id: '105', yoruba: 'Ti emi ni', english: 'It is mine', pronunciation: 'tee eh-mee nee' },
  { id: '106', yoruba: 'Ti rẹ ni', english: 'It is yours', pronunciation: 'tee reh nee' },
];

const dailyRoutinesWords: Word[] = [
  { id: '107', yoruba: 'Jí', english: 'Wake up', pronunciation: 'jee' },
  { id: '108', yoruba: 'Wẹ̀', english: 'Bathe', pronunciation: 'weh' },
  { id: '109', yoruba: 'Jẹun', english: 'Eat', pronunciation: 'jeh-oon' },
  { id: '110', yoruba: 'Mu', english: 'Drink', pronunciation: 'moo' },
  { id: '111', yoruba: 'Lọ sí iṣẹ́', english: 'Go to work', pronunciation: 'loh see ee-sheh' },
  { id: '112', yoruba: 'Padà sílé', english: 'Return home', pronunciation: 'pah-dah see-leh' },
  { id: '113', yoruba: 'Sùn', english: 'Sleep', pronunciation: 'soon' },
  { id: '114', yoruba: 'Kàwé', english: 'Study/Read', pronunciation: 'kah-weh' },
  { id: '115', yoruba: 'Ṣeré', english: 'Play', pronunciation: 'sheh-reh' },
  { id: '116', yoruba: 'Iṣẹ́', english: 'Work', pronunciation: 'ee-sheh' },
];

const personalBackgroundWords: Word[] = [
  { id: '117', yoruba: 'Iṣẹ́', english: 'Job/Profession', pronunciation: 'ee-sheh' },
  { id: '118', yoruba: 'Akẹ́kọ̀ọ́', english: 'Student', pronunciation: 'ah-keh-koh-oh' },
  { id: '119', yoruba: 'Olùkọ́', english: 'Teacher', pronunciation: 'oh-loo-koh' },
  { id: '120', yoruba: 'Dókítà', english: 'Doctor', pronunciation: 'doh-kee-tah' },
  { id: '121', yoruba: 'Agbẹ̀', english: 'Farmer', pronunciation: 'ah-beh' },
  { id: '122', yoruba: 'Oníṣòwò', english: 'Trader/Merchant', pronunciation: 'oh-nee-shoh-woh' },
  { id: '123', yoruba: 'Ìlú', english: 'City/Town', pronunciation: 'ee-loo' },
  { id: '124', yoruba: 'Abúlé', english: 'Village', pronunciation: 'ah-boo-leh' },
  { id: '125', yoruba: 'Mo ti ibẹ̀ wá', english: 'I come from there', pronunciation: 'moh tee ee-beh wah' },
  { id: '126', yoruba: 'Níbo ni o ti wá?', english: 'Where do you come from?', pronunciation: 'nee-boh nee oh tee wah' },
  { id: '127', yoruba: 'Kí ni iṣẹ́ rẹ?', english: 'What is your job?', pronunciation: 'kee nee ee-sheh reh' },
  { id: '128', yoruba: 'Ìgbéyàwó', english: 'Marriage', pronunciation: 'ee-beh-yah-woh' },
  { id: '129', yoruba: 'Ìgbéyàwó mi', english: 'My marriage', pronunciation: 'ee-beh-yah-woh mee' },
  { id: '130', yoruba: 'Ọ̀dọ̀mọbìnrin', english: 'Single (female)', pronunciation: 'oh-doh-moh-bee-reen' },
  { id: '131', yoruba: 'Ọ̀dọ̀mọkùnrin', english: 'Single (male)', pronunciation: 'oh-doh-moh-koon-reen' },
];

const shoppingWords: Word[] = [
  { id: '132', yoruba: 'Ọjà', english: 'Market', pronunciation: 'oh-jah' },
  { id: '133', yoruba: 'Rà', english: 'Buy', pronunciation: 'rah' },
  { id: '134', yoruba: 'Tà', english: 'Sell', pronunciation: 'tah' },
  { id: '135', yoruba: 'Iye owó', english: 'Price', pronunciation: 'ee-yeh oh-woh' },
  { id: '136', yoruba: 'Iye owó rẹ̀ kí ni?', english: 'What is the price?', pronunciation: 'ee-yeh oh-woh reh kee nee' },
  { id: '137', yoruba: 'Ó gbówó púpọ̀', english: 'It is expensive', pronunciation: 'oh boh-woh poo-poh' },
  { id: '138', yoruba: 'Ó pọ̀n', english: 'It is cheap', pronunciation: 'oh pohn' },
  { id: '139', yoruba: 'Àpò', english: 'Shopping bag', pronunciation: 'ah-poh' },
  { id: '140', yoruba: 'Oníṣòwò', english: 'Seller/Vendor', pronunciation: 'oh-nee-shoh-woh' },
  { id: '141', yoruba: 'Onírà', english: 'Customer/Buyer', pronunciation: 'oh-nee-rah' },
  { id: '142', yoruba: 'Dín owó kù', english: 'Give discount/Reduce price', pronunciation: 'deen oh-woh koo' },
  { id: '143', yoruba: 'Ṣòro', english: 'Bargain/Negotiate', pronunciation: 'shoh-roh' },
  { id: '144', yoruba: 'Àwọn nǹkan', english: 'Items/Things', pronunciation: 'ah-wohn nahn-kahn' },
  { id: '145', yoruba: 'Ẹ̀wà àti irẹsì', english: 'Beans and rice', pronunciation: 'eh-wah ah-tee ee-reh-see' },
  { id: '146', yoruba: 'Ẹja', english: 'Fish', pronunciation: 'eh-jah' },
  { id: '147', yoruba: 'Ewébẹ̀', english: 'Vegetables', pronunciation: 'eh-weh-beh' },
  { id: '148', yoruba: 'Èso', english: 'Fruits', pronunciation: 'eh-soh' },
];

const localGeographyWords: Word[] = [
  { id: '149', yoruba: 'Agbègbè', english: 'Area/Region', pronunciation: 'ah-beh-beh' },
  { id: '150', yoruba: 'Ìlú', english: 'City/Town', pronunciation: 'ee-loo' },
  { id: '151', yoruba: 'Abúlé', english: 'Village', pronunciation: 'ah-boo-leh' },
  { id: '152', yoruba: 'Òpópónà', english: 'Street/Road', pronunciation: 'oh-poh-poh-nah' },
  { id: '153', yoruba: 'Ọ̀nà', english: 'Path/Way', pronunciation: 'oh-nah' },
  { id: '154', yoruba: 'Àfin', english: 'Palace', pronunciation: 'ah-feen' },
  { id: '155', yoruba: 'Ọjà', english: 'Market square', pronunciation: 'oh-jah' },
  { id: '156', yoruba: 'Odò', english: 'River', pronunciation: 'oh-doh' },
  { id: '157', yoruba: 'Òkè', english: 'Hill/Mountain', pronunciation: 'oh-keh' },
  { id: '158', yoruba: 'Igbó', english: 'Forest', pronunciation: 'ee-boh' },
  { id: '159', yoruba: 'Oko', english: 'Farm/Field', pronunciation: 'oh-koh' },
  { id: '160', yoruba: 'Ìlú wa', english: 'Our town', pronunciation: 'ee-loo wah' },
  { id: '161', yoruba: 'Níbo ni...?', english: 'Where is...?', pronunciation: 'nee-boh nee' },
  { id: '162', yoruba: 'Ó wà níbí', english: 'It is here', pronunciation: 'oh wah nee-bee' },
  { id: '163', yoruba: 'Ó wà níbẹ̀', english: 'It is there', pronunciation: 'oh wah nee-beh' },
];

const employmentWords: Word[] = [
  { id: '164', yoruba: 'Iṣẹ́', english: 'Work/Job', pronunciation: 'ee-sheh' },
  { id: '165', yoruba: 'Oṣiṣẹ́', english: 'Worker/Employee', pronunciation: 'oh-shee-sheh' },
  { id: '166', yoruba: 'Olùdarí', english: 'Boss/Manager', pronunciation: 'oh-loo-dah-ree' },
  { id: '167', yoruba: 'Ibi iṣẹ́', english: 'Workplace', pronunciation: 'ee-bee ee-sheh' },
  { id: '168', yoruba: 'Ọ̀fíìsì', english: 'Office', pronunciation: 'oh-fee-see' },
  { id: '169', yoruba: 'Ilé iṣẹ́', english: 'Factory', pronunciation: 'ee-leh ee-sheh' },
  { id: '170', yoruba: 'Owó oṣù', english: 'Monthly salary', pronunciation: 'oh-woh oh-shoo' },
  { id: '171', yoruba: 'Owó ọjọ́', english: 'Daily wage', pronunciation: 'oh-woh oh-joh' },
  { id: '172', yoruba: 'Àkókò iṣẹ́', english: 'Working hours', pronunciation: 'ah-koh-koh ee-sheh' },
  { id: '173', yoruba: 'Ìsinmi', english: 'Break/Rest', pronunciation: 'ee-sheen-mee' },
  { id: '174', yoruba: 'Ọjọ́ ìsinmi', english: 'Day off/Holiday', pronunciation: 'oh-joh ee-sheen-mee' },
  { id: '175', yoruba: 'Àjọ', english: 'Meeting', pronunciation: 'ah-joh' },
  { id: '176', yoruba: 'Iṣẹ́ takuntakun', english: 'Part-time work', pronunciation: 'ee-sheh tah-koon-tah-koon' },
  { id: '177', yoruba: 'Iṣẹ́ kíkún', english: 'Full-time work', pronunciation: 'ee-sheh kee-koon' },
  { id: '178', yoruba: 'Àìní iṣẹ́', english: 'Unemployment', pronunciation: 'ah-ee-nee ee-sheh' },
];

const hobbiesLeisureWords: Word[] = [
  { id: '179', yoruba: 'Ìgbádùn', english: 'Entertainment/Fun', pronunciation: 'ee-bah-doon' },
  { id: '180', yoruba: 'Eré', english: 'Game/Play', pronunciation: 'eh-reh' },
  { id: '181', yoruba: 'Bọ́ọ̀lù', english: 'Football/Soccer', pronunciation: 'boh-oh-loo' },
  { id: '182', yoruba: 'Orin', english: 'Music/Song', pronunciation: 'oh-reen' },
  { id: '183', yoruba: 'Ijó', english: 'Dance', pronunciation: 'ee-joh' },
  { id: '184', yoruba: 'Kíkà ìwé', english: 'Reading books', pronunciation: 'kee-kah ee-weh' },
  { id: '185', yoruba: 'Fífọ́tò', english: 'Taking photos', pronunciation: 'fee-foh-toh' },
  { id: '186', yoruba: 'Rírìn àjò', english: 'Traveling', pronunciation: 'ree-reen ah-joh' },
  { id: '187', yoruba: 'Sísùn', english: 'Sleeping/Resting', pronunciation: 'shee-soon' },
  { id: '188', yoruba: 'Wíwò tẹlifíṣọ̀n', english: 'Watching TV', pronunciation: 'wee-woh teh-lee-fee-shohn' },
  { id: '189', yoruba: 'Ṣíṣe oúnjẹ', english: 'Cooking', pronunciation: 'shee-sheh oh-oon-jeh' },
  { id: '190', yoruba: 'Gbígbin', english: 'Gardening', pronunciation: 'bee-been' },
  { id: '191', yoruba: 'Kíkọ́ ọkọ̀', english: 'Driving', pronunciation: 'kee-koh oh-koh' },
  { id: '192', yoruba: 'Ṣíṣe ìdárayá', english: 'Doing sports', pronunciation: 'shee-sheh ee-dah-rah-yah' },
  { id: '193', yoruba: 'Àkókò ìsinmi', english: 'Leisure time', pronunciation: 'ah-koh-koh ee-sheen-mee' },
];

function createExercises(words: Word[], category: string): Exercise[] {
  const exercises: Exercise[] = [];
  const shuffledWords = [...words].sort(() => Math.random() - 0.5);
  
  // Multiple choice exercises (5 questions)
  shuffledWords.slice(0, 5).forEach((word, index) => {
    const wrongOptions = shuffledWords
      .filter(w => w.id !== word.id)
      .slice(0, 3)
      .map(w => w.english);
    
    exercises.push({
      id: `${category}-mc-${index}`,
      type: 'multiple-choice',
      question: `What does "${word.yoruba}" mean?`,
      correctAnswer: word.english,
      options: [word.english, ...wrongOptions].sort(() => Math.random() - 0.5),
      word,
    });
  });

  // Translation exercises (5 questions)
  shuffledWords.slice(5, 10).forEach((word, index) => {
    const wrongOptions = shuffledWords
      .filter(w => w.id !== word.id)
      .slice(0, 3)
      .map(w => w.yoruba);
    
    exercises.push({
      id: `${category}-trans-${index}`,
      type: 'translation',
      question: `Translate: ${word.english}`,
      correctAnswer: word.yoruba,
      options: [word.yoruba, ...wrongOptions].sort(() => Math.random() - 0.5),
      word,
    });
  });

  // Additional multiple choice with pronunciation focus (2 questions)
  if (shuffledWords.length > 10) {
    shuffledWords.slice(10, 12).forEach((word, index) => {
      const wrongOptions = shuffledWords
        .filter(w => w.id !== word.id && w.pronunciation)
        .slice(0, 3)
        .map(w => w.pronunciation!);
      
      exercises.push({
        id: `${category}-pron-${index}`,
        type: 'multiple-choice',
        question: `How do you pronounce "${word.yoruba}"?`,
        correctAnswer: word.pronunciation!,
        options: [word.pronunciation!, ...wrongOptions].sort(() => Math.random() - 0.5),
        word,
      });
    });
  }

  // Matching exercises (2 questions)
  if (shuffledWords.length >= 4) {
    const matchingPairs1 = shuffledWords.slice(0, 4).map(w => ({
      yoruba: w.yoruba,
      english: w.english,
    }));
    
    exercises.push({
      id: `${category}-match-1`,
      type: 'matching',
      question: 'Match the Yoruba words with their English meanings',
      correctAnswer: '',
      pairs: matchingPairs1,
    });
  }

  if (shuffledWords.length >= 8) {
    const matchingPairs2 = shuffledWords.slice(4, 8).map(w => ({
      yoruba: w.yoruba,
      english: w.english,
    }));
    
    exercises.push({
      id: `${category}-match-2`,
      type: 'matching',
      question: 'Match these Yoruba words with their English meanings',
      correctAnswer: '',
      pairs: matchingPairs2,
    });
  }

  // Fill in remaining slots with more multiple choice if needed
  const remaining = 10 - exercises.length;
  if (remaining > 0 && shuffledWords.length > exercises.length) {
    shuffledWords.slice(exercises.length, exercises.length + remaining).forEach((word, index) => {
      const wrongOptions = shuffledWords
        .filter(w => w.id !== word.id)
        .slice(0, 3)
        .map(w => w.english);
      
      exercises.push({
        id: `${category}-extra-${index}`,
        type: 'multiple-choice',
        question: `What does "${word.yoruba}" mean?`,
        correctAnswer: word.english,
        options: [word.english, ...wrongOptions].sort(() => Math.random() - 0.5),
        word,
      });
    });
  }

  return exercises.slice(0, 10); // Ensure exactly 10 exercises
}



function createStoryExercise(unitId: string, storyData: {
  text: string;
  blanks: { position: number; answer: string; options: string[] }[];
  comprehensionQuestion: string;
  comprehensionAnswer: string;
  comprehensionOptions: string[];
}): Exercise {
  return {
    id: `${unitId}-story`,
    type: 'story',
    question: 'Complete the story by filling in the blanks, then answer the comprehension question.',
    correctAnswer: '',
    story: storyData,
  };
}

export const categories: Category[] = [
  {
    id: 'unit-0-language-basics',
    name: 'Unit 0: Yoruba Language Basics',
    color: '#9B59B6',
    icon: '🔤',
    vocabulary: [...alphabetWords, ...toneWords, ...pronunciationWords, ...basicSoundsWords],
    lessons: [
      {
        id: 'alphabet-intro',
        title: 'Yoruba Alphabet Introduction',
        category: 'unit-0-language-basics',
        icon: '🔤',
        color: '#9B59B6',
        introduction: {
          title: 'Understanding the Yoruba Alphabet',
          content: 'Welcome to your first lesson in Yoruba! The Yoruba alphabet is the foundation of the language, and understanding it is crucial for proper pronunciation and reading.\n\n**Key Facts About the Yoruba Alphabet:**\n\n• The Yoruba alphabet has 25 letters (compared to English\'s 26)\n• It uses the same basic letters as English, except: C, Q, V, X, and Z are not used\n• Yoruba has special dotted letters: Ẹ, Ọ, and Ṣ\n• These dotted letters represent sounds that don\'t exist in English\n\n**Why This Matters:**\nUnlike English, every letter in Yoruba has a consistent sound. Once you learn the alphabet, you can pronounce any Yoruba word correctly! The special dotted letters are particularly important because they represent unique Yoruba sounds that give the language its distinctive character.\n\n**What Makes Yoruba Special:**\nYoruba is a tonal language, which means the pitch of your voice changes the meaning of words. But don\'t worry - we\'ll cover tones in detail in later lessons. For now, focus on mastering the basic letter sounds.',
          examples: [
            { yoruba: 'A', english: 'Pronounced like "ah" in "father"', pronunciation: 'ah' },
            { yoruba: 'Ẹ', english: 'Open E sound, like "eh" in "get"', pronunciation: 'eh (open)' },
            { yoruba: 'Ọ', english: 'Open O sound, like "aw" in "thought"', pronunciation: 'aw' },
            { yoruba: 'Ṣ', english: 'SH sound, like "sh" in "shoe"', pronunciation: 'sh' }
          ]
        },
        exercises: [
          {
            id: 'alphabet-intro-1',
            type: 'multiple-choice',
            question: 'How many letters are in the Yoruba alphabet?',
            correctAnswer: '25 letters',
            options: ['26 letters (like English)', '25 letters', '24 letters', '27 letters'],
          },
          {
            id: 'alphabet-intro-2',
            type: 'multiple-choice',
            question: 'Which letters from the English alphabet are NOT used in Yoruba?',
            correctAnswer: 'C, Q, V, X, Z',
            options: ['A, E, I, O, U', 'C, Q, V, X, Z', 'B, D, F, G, H', 'J, K, L, M, N'],
          },
          {
            id: 'alphabet-intro-3',
            type: 'multiple-choice',
            question: 'What makes Yoruba special compared to English?',
            correctAnswer: 'It uses tone marks and special dotted letters',
            options: ['It has more letters', 'It uses tone marks and special dotted letters', 'It reads from right to left', 'It has no vowels'],
          },
          {
            id: 'alphabet-intro-4',
            type: 'multiple-choice',
            question: 'In Yoruba, every letter has:',
            correctAnswer: 'A consistent sound',
            options: ['A consistent sound', 'Multiple pronunciations', 'Silent variations', 'Different meanings'],
          },
          {
            id: 'alphabet-intro-5',
            type: 'multiple-choice',
            question: 'What are the three special dotted letters in Yoruba?',
            correctAnswer: 'Ẹ, Ọ, Ṣ',
            options: ['Ẹ, Ọ, Ṣ', 'Á, É, Í', 'À, È, Ì', 'Â, Ê, Î'],
          },
          {
            id: 'alphabet-intro-6',
            type: 'multiple-choice',
            question: 'Why is learning the Yoruba alphabet important?',
            correctAnswer: 'It helps you pronounce any Yoruba word correctly',
            options: ['It helps you pronounce any Yoruba word correctly', 'It makes you sound more intelligent', 'It\'s required by law', 'It helps with English pronunciation'],
          },
          {
            id: 'alphabet-intro-7',
            type: 'multiple-choice',
            question: 'How many people worldwide speak Yoruba?',
            correctAnswer: 'Over 40 million',
            options: ['Over 40 million', 'About 10 million', 'Less than 5 million', 'Over 100 million'],
          },
          {
            id: 'alphabet-intro-8',
            type: 'multiple-choice',
            question: 'What type of language is Yoruba?',
            correctAnswer: 'A tonal language',
            options: ['A tonal language', 'A sign language', 'A dead language', 'A programming language'],
          },
          {
            id: 'alphabet-intro-9',
            type: 'multiple-choice',
            question: 'Which of these is true about Yoruba pronunciation?',
            correctAnswer: 'If you see a letter, you pronounce it',
            options: ['If you see a letter, you pronounce it', 'Many letters are silent', 'Pronunciation changes by region', 'Letters have no fixed sounds'],
          },
          {
            id: 'alphabet-intro-10',
            type: 'multiple-choice',
            question: 'What should you focus on first when learning Yoruba?',
            correctAnswer: 'Mastering the basic letter sounds',
            options: ['Mastering the basic letter sounds', 'Learning complex grammar', 'Memorizing long sentences', 'Understanding cultural history'],
          },
        ],
        xpReward: 20,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'special-letters',
        title: 'Special Letters & Sounds',
        category: 'unit-0-language-basics',
        icon: '✨',
        color: '#8E44AD',
        introduction: {
          title: 'Mastering Yoruba\'s Unique Sounds',
          content: 'Now that you know the basic alphabet, let\'s explore what makes Yoruba truly unique - its special letters and sounds that don\'t exist in English.\n\n**The Dotted Letters (Ẹ, Ọ, Ṣ):**\n\n• **Ẹ (E with dot below):** This is an "open E" sound, like the "e" in "get" or "bed". It\'s different from the regular E, which sounds more like "ay" in "hey".\n\n• **Ọ (O with dot below):** This is an "open O" sound, like "aw" in "thought" or "caught". Regular O sounds more like "oh" in "go".\n\n• **Ṣ (S with dot below):** This makes the "sh" sound like in "shoe" or "wash".\n\n**The GB Sound:**\nThis is perhaps the most challenging sound for English speakers. GB is not "G" followed by "B" - instead, you say both sounds simultaneously! It\'s like closing your lips for "B" while also making the "G" sound in your throat at the exact same time.\n\n**Why These Sounds Matter:**\nThese special sounds are not optional decorations - they completely change word meanings. Using the wrong sound can make you say a totally different word!',
          examples: [
            { yoruba: 'Ẹ vs E', english: 'Ẹ (open) = "get", E (closed) = "hey"', pronunciation: 'eh vs ay' },
            { yoruba: 'Ọ vs O', english: 'Ọ (open) = "thought", O (closed) = "go"', pronunciation: 'aw vs oh' },
            { yoruba: 'Ṣe', english: 'To do/make (with SH sound)', pronunciation: 'sheh' },
            { yoruba: 'Gbà', english: 'To accept (GB sound)', pronunciation: 'gbah' }
          ]
        },
        exercises: [
          {
            id: 'special-letters-1',
            type: 'multiple-choice',
            question: 'Which of these letters has a dot underneath and makes an "aw" sound?',
            correctAnswer: 'Ọ',
            options: ['O', 'Ọ', 'Ọ̀', 'Ó'],
          },
          {
            id: 'special-letters-2',
            type: 'multiple-choice',
            question: 'The "GB" sound in Yoruba is made by:',
            correctAnswer: 'Saying G and B simultaneously',
            options: ['Saying G then B quickly', 'Saying G and B simultaneously', 'Making a clicking sound', 'Rolling your tongue'],
          },
          {
            id: 'special-letters-3',
            type: 'multiple-choice',
            question: 'Which Yoruba letter makes the "sh" sound like in "shoe"?',
            correctAnswer: 'Ṣ',
            options: ['S', 'Ṣ', 'Sh', 'C'],
          },
          {
            id: 'special-letters-4',
            type: 'multiple-choice',
            question: 'Why does Yoruba have dotted letters like Ẹ and Ọ?',
            correctAnswer: 'To show different vowel sounds that don\'t exist in English',
            options: ['For decoration', 'To show different vowel sounds that don\'t exist in English', 'To make writing harder', 'They are optional'],
          },
          {
            id: 'special-letters-5',
            type: 'multiple-choice',
            question: 'How does the "Ẹ" sound differ from regular "E"?',
            correctAnswer: 'Ẹ is more open, like "get"; E is closed, like "hey"',
            options: ['Ẹ is more open, like "get"; E is closed, like "hey"', 'They sound exactly the same', 'Ẹ is louder than E', 'Ẹ is whispered'],
          },
          {
            id: 'special-letters-6',
            type: 'multiple-choice',
            question: 'What happens if you use "O" instead of "Ọ" in a word?',
            correctAnswer: 'You might say a completely different word',
            options: ['You might say a completely different word', 'Nothing changes', 'It sounds more polite', 'It becomes plural'],
          },
          {
            id: 'special-letters-7',
            type: 'multiple-choice',
            question: 'Which sound is most challenging for English speakers?',
            correctAnswer: 'The GB sound',
            options: ['The GB sound', 'The Ṣ sound', 'The Ẹ sound', 'The Ọ sound'],
          },
          {
            id: 'special-letters-8',
            type: 'multiple-choice',
            question: 'In the word "Ṣe" (to do), what sound does "Ṣ" make?',
            correctAnswer: 'The "sh" sound like in "shoe"',
            options: ['The "sh" sound like in "shoe"', 'The "s" sound like in "sun"', 'The "z" sound like in "zoo"', 'The "ch" sound like in "chair"'],
          },
          {
            id: 'special-letters-9',
            type: 'multiple-choice',
            question: 'What is the key to mastering Yoruba special sounds?',
            correctAnswer: 'Practice and listening to native speakers',
            options: ['Practice and listening to native speakers', 'Memorizing rules', 'Speaking very loudly', 'Ignoring the differences'],
          },
          {
            id: 'special-letters-10',
            type: 'multiple-choice',
            question: 'Which word demonstrates the GB sound?',
            correctAnswer: 'Gbà (to accept)',
            options: ['Gbà (to accept)', 'Bá (to meet)', 'Gá (to climb)', 'Bọ́ (to worship)'],
          },
        ],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'tone-system',
        title: 'The Yoruba Tone System',
        category: 'unit-0-language-basics',
        icon: '🎵',
        color: '#7D3C98',
        introduction: {
          title: 'Understanding Tones - The Heart of Yoruba',
          content: 'Tones are what make Yoruba truly musical and expressive. Unlike English, where changing your pitch just adds emotion, in Yoruba, changing the pitch changes the actual meaning of the word!\n\n**The Three Basic Tones:**\n\n• **High Tone (á):** Marked with an acute accent (´). Your voice goes UP, like when you\'re surprised: "Really?"\n\n• **Mid Tone (a):** No mark needed. Your voice stays neutral and flat, like when you\'re stating a fact.\n\n• **Low Tone (à):** Marked with a grave accent (`). Your voice goes DOWN, like when you\'re disappointed: "Oh..."\n\n**How Tones Work:**\nImagine saying "ba" in three different ways:\n• **bá** (high) = "to meet" - like excitedly saying "Let\'s meet!"\n• **ba** (mid) = "to come" - neutral statement\n• **bà** (low) = "to perch" - like a bird settling down\n\n**Why Tones Are Crucial:**\nGetting the tone wrong is like using a completely different word. It\'s not just an accent - it\'s the difference between saying "come" and "meet"! Native speakers rely on tones to understand what you mean.\n\n**Learning Strategy:**\nThink of Yoruba as a musical language. Each word has its own melody, and you need to sing that melody to be understood correctly.',
          examples: [
            { yoruba: 'bá', english: 'to meet (high tone - excited)', pronunciation: 'BAH ↗' },
            { yoruba: 'ba', english: 'to come (mid tone - neutral)', pronunciation: 'bah →' },
            { yoruba: 'bà', english: 'to perch (low tone - settling)', pronunciation: 'bah ↘' },
            { yoruba: 'Yorùbá', english: 'The language name (low-high pattern)', pronunciation: 'yo-RU-BAH' }
          ]
        },
        exercises: [
          {
            id: 'tone-intro',
            type: 'multiple-choice',
            question: 'How many basic tones does Yoruba have?',
            correctAnswer: 'Three: High, Mid, and Low',
            options: ['Two: High and Low', 'Three: High, Mid, and Low', 'Four: Very High, High, Low, Very Low', 'Five different tones'],
          },
          {
            id: 'tone-meaning',
            type: 'multiple-choice',
            question: 'In Yoruba, changing the tone of a word can:',
            correctAnswer: 'Completely change its meaning',
            options: ['Make it louder', 'Completely change its meaning', 'Make it more polite', 'Add emphasis only'],
          },
          {
            id: 'tone-high-mark',
            type: 'multiple-choice',
            question: 'Which tone mark indicates a HIGH tone in Yoruba?',
            correctAnswer: 'Acute accent (á)',
            options: ['Grave accent (à)', 'Acute accent (á)', 'No mark (a)', 'Circumflex (â)'],
          },
          {
            id: 'tone-ba-meanings',
            type: 'matching',
            question: 'Match each "ba" with its correct meaning based on tone:',
            correctAnswer: '',
            pairs: [
              { yoruba: 'bá', english: 'to meet' },
              { yoruba: 'bà', english: 'to perch' },
              { yoruba: 'ba', english: 'to come' },
            ],
          },
          {
            id: 'tone-ko-meanings',
            type: 'multiple-choice',
            question: 'What does "kó" (high tone) mean?',
            correctAnswer: 'to gather/collect',
            options: ['to gather/collect', 'to refuse', 'to learn', 'to build'],
          },
          {
            id: 'tone-ko-low',
            type: 'multiple-choice',
            question: 'What does "kò" (low tone) mean?',
            correctAnswer: 'to refuse/not',
            options: ['to gather/collect', 'to refuse/not', 'to learn', 'to build'],
          },
          {
            id: 'tone-ko-mid',
            type: 'multiple-choice',
            question: 'What does "ko" (mid tone) mean?',
            correctAnswer: 'to learn/teach',
            options: ['to gather/collect', 'to refuse/not', 'to learn/teach', 'to build'],
          },
          {
            id: 'tone-pa-meanings',
            type: 'matching',
            question: 'Match each "pa" with its correct meaning based on tone:',
            correctAnswer: '',
            pairs: [
              { yoruba: 'pá', english: 'to kill' },
              { yoruba: 'pà', english: 'to clap' },
              { yoruba: 'pa', english: 'to shut/close' },
            ],
          },
          {
            id: 'tone-wa-high',
            type: 'multiple-choice',
            question: 'What does "wá" (high tone) mean?',
            correctAnswer: 'to come',
            options: ['to come', 'to exist/be', 'to look for', 'to wash'],
          },
          {
            id: 'tone-wa-low',
            type: 'multiple-choice',
            question: 'What does "wà" (low tone) mean?',
            correctAnswer: 'to exist/be',
            options: ['to come', 'to exist/be', 'to look for', 'to wash'],
          },
          {
            id: 'tone-wa-mid',
            type: 'multiple-choice',
            question: 'What does "wa" (mid tone) mean?',
            correctAnswer: 'to look for',
            options: ['to come', 'to exist/be', 'to look for', 'to wash'],
          },
          {
            id: 'tone-ri-meanings',
            type: 'matching',
            question: 'Match each "ri" with its correct meaning based on tone:',
            correctAnswer: '',
            pairs: [
              { yoruba: 'rí', english: 'to see' },
              { yoruba: 'rì', english: 'to buy' },
              { yoruba: 'ri', english: 'to get/obtain' },
            ],
          },
          {
            id: 'tone-so-high',
            type: 'multiple-choice',
            question: 'What does "só" (high tone) mean?',
            correctAnswer: 'to say/speak',
            options: ['to say/speak', 'to throw', 'to turn into', 'to jump'],
          },
          {
            id: 'tone-so-low',
            type: 'multiple-choice',
            question: 'What does "sò" (low tone) mean?',
            correctAnswer: 'to throw',
            options: ['to say/speak', 'to throw', 'to turn into', 'to jump'],
          },
          {
            id: 'tone-so-mid',
            type: 'multiple-choice',
            question: 'What does "so" (mid tone) mean?',
            correctAnswer: 'to turn into',
            options: ['to say/speak', 'to throw', 'to turn into', 'to jump'],
          },
          {
            id: 'tone-importance',
            type: 'multiple-choice',
            question: 'What happens if you use the wrong tone in Yoruba?',
            correctAnswer: 'You might say a completely different word',
            options: ['Nothing, people will understand', 'You might say a completely different word', 'It just sounds impolite', 'The word becomes plural'],
          },
        ],
        xpReward: 30,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'pronunciation-mastery',
        title: 'Pronunciation Mastery',
        category: 'unit-0-language-basics',
        icon: '🗣️',
        color: '#6C3483',
        introduction: {
          title: 'Bringing It All Together - Perfect Pronunciation',
          content: 'Now that you understand the alphabet, special letters, and tones, let\'s put it all together to achieve authentic Yoruba pronunciation. This is where everything clicks!\n\n**The Pronunciation Formula:**\nCorrect Yoruba pronunciation = Right Letters + Right Tones + Proper Rhythm\n\n**Key Pronunciation Principles:**\n\n• **Every vowel is pronounced:** Unlike English, Yoruba doesn\'t have silent letters. If you see it, you say it!\n\n• **Vowel sounds are pure:** Yoruba vowels don\'t glide like English. "E" is always "eh", never "ay".\n\n• **Consonants are crisp:** Make each consonant sound clear and distinct.\n\n• **Tone patterns flow:** Don\'t make tones sound choppy - let them flow naturally like music.\n\n**Common Mistakes to Avoid:**\n• Don\'t add extra vowel sounds ("Yoruba" not "Yorubah")\n• Don\'t ignore the dots under letters (Ẹ ≠ E)\n• Don\'t flatten the tones (it changes meanings!)\n• Don\'t rush - Yoruba has a natural rhythm\n\n**Practice Strategy:**\nStart slowly, focus on accuracy, then gradually increase speed. Think of learning pronunciation like learning to play a musical instrument - precision first, then fluency.',
          examples: [
            { yoruba: 'Ẹ káàárọ̀', english: 'Good morning (practice the tone pattern)', pronunciation: 'eh-KAH-ah-ah-raw' },
            { yoruba: 'Yorùbá', english: 'The language (low-high pattern)', pronunciation: 'yo-roo-BAH' },
            { yoruba: 'Ẹ ṣé', english: 'Thank you (open E + SH sound)', pronunciation: 'eh-SHEH' },
            { yoruba: 'Gbogbo', english: 'All/everything (GB sound)', pronunciation: 'GBOH-gboh' }
          ]
        },
        exercises: [
          {
            id: 'pronunciation-open-sounds',
            type: 'multiple-choice',
            question: 'The difference between "E" and "Ẹ" in Yoruba is:',
            correctAnswer: 'Ẹ is more open, like "get", E is closed like "hey"',
            options: ['They sound exactly the same', 'Ẹ is more open, like "get", E is closed like "hey"', 'E is louder than Ẹ', 'Ẹ is whispered'],
          },
          {
            id: 'pronunciation-yoruba-greeting',
            type: 'translation',
            question: 'How do you say "Good morning" in Yoruba?',
            correctAnswer: 'Ẹ káàárọ̀',
            options: ['Ẹ káàárọ̀', 'Ẹ káalẹ́', 'Báwo ni', 'Ẹ ṣé'],
          },
          {
            id: 'pronunciation-tone-practice',
            type: 'multiple-choice',
            question: 'In "Yorùbá", which syllable has the HIGH tone?',
            correctAnswer: 'The last syllable (bá)',
            options: ['The first syllable (Yo)', 'The middle syllable (rù)', 'The last syllable (bá)', 'All syllables are the same'],
          },
          {
            id: 'sound-patterns',
            type: 'matching',
            question: 'Match these sound patterns with their tone descriptions:',
            correctAnswer: '',
            pairs: [
              { yoruba: 'Àá', english: 'Low-High pattern' },
              { yoruba: 'Òó', english: 'Low-High pattern' },
              { yoruba: 'Ẹ̀ẹ́', english: 'Open E: Low-High' },
              { yoruba: 'Ọ̀ọ́', english: 'Open O: Low-High' },
            ],
          },
          {
            id: 'pronunciation-vowel-purity',
            type: 'multiple-choice',
            question: 'What does "vowel sounds are pure" mean in Yoruba?',
            correctAnswer: 'Each vowel has one consistent sound, no gliding',
            options: ['Each vowel has one consistent sound, no gliding', 'Vowels are pronounced very loudly', 'Vowels are always long', 'Vowels change based on context'],
          },
          {
            id: 'pronunciation-rhythm',
            type: 'multiple-choice',
            question: 'How should you approach Yoruba pronunciation practice?',
            correctAnswer: 'Start slowly with accuracy, then increase speed',
            options: ['Start slowly with accuracy, then increase speed', 'Speak as fast as possible', 'Focus only on speed', 'Don\'t worry about accuracy'],
          },
          {
            id: 'pronunciation-common-mistake-1',
            type: 'multiple-choice',
            question: 'Which is a common pronunciation mistake to avoid?',
            correctAnswer: 'Adding extra vowel sounds at the end of words',
            options: ['Adding extra vowel sounds at the end of words', 'Speaking too clearly', 'Using proper tones', 'Pronouncing all letters'],
          },
          {
            id: 'pronunciation-thank-you',
            type: 'multiple-choice',
            question: 'In "Ẹ ṣé" (thank you), what two special sounds are used?',
            correctAnswer: 'Open Ẹ and SH sound (ṣ)',
            options: ['Open Ẹ and SH sound (ṣ)', 'Regular E and S sound', 'High tone E and Z sound', 'Whispered E and T sound'],
          },
          {
            id: 'pronunciation-gbogbo',
            type: 'multiple-choice',
            question: 'How do you pronounce "Gbogbo" (all/everything)?',
            correctAnswer: 'GBOH-gboh (with simultaneous G+B sounds)',
            options: ['GBOH-gboh (with simultaneous G+B sounds)', 'GOH-boh (G then B)', 'BOH-goh (B then G)', 'KOH-poh (K and P sounds)'],
          },
          {
            id: 'pronunciation-formula',
            type: 'multiple-choice',
            question: 'What is the Yoruba pronunciation formula?',
            correctAnswer: 'Right Letters + Right Tones + Proper Rhythm',
            options: ['Right Letters + Right Tones + Proper Rhythm', 'Loud Voice + Fast Speech + Good Memory', 'Perfect Grammar + Long Sentences + Complex Words', 'Silent Letters + Flat Tones + Quick Rhythm'],
          },
        ],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'language-practice',
        title: 'Putting It All Together',
        category: 'unit-0-language-basics',
        icon: '🎯',
        color: '#5B2C6F',
        introduction: {
          title: 'Your Yoruba Foundation - Ready to Build!',
          content: 'Congratulations! You\'ve learned the essential building blocks of Yoruba. Now let\'s test your understanding and prepare you for real conversations.\n\n**What You\'ve Mastered:**\n\n• **25-letter alphabet** with consistent pronunciation rules\n• **Special dotted letters** (Ẹ, Ọ, Ṣ) and unique sounds like GB\n• **Three-tone system** that changes word meanings\n• **Pronunciation principles** for authentic Yoruba speech\n\n**Your Yoruba Toolkit:**\nYou now have everything you need to:\n• Read any Yoruba word correctly\n• Understand why tones matter\n• Pronounce greetings authentically\n• Recognize the musical nature of the language\n\n**Moving Forward:**\nWith this foundation, you\'re ready to learn vocabulary, basic phrases, and start having simple conversations. Remember:\n\n• **Practice regularly** - even 5 minutes daily helps\n• **Listen to native speakers** when possible\n• **Don\'t be afraid to make mistakes** - they\'re part of learning\n• **Focus on tones** - they\'re the key to being understood\n\n**Cultural Note:**\nYoruba is spoken by over 40 million people worldwide. By learning these fundamentals, you\'re connecting with a rich cultural heritage and opening doors to meaningful communication.',
          examples: [
            { yoruba: 'Ẹ káàárọ̀', english: 'Good morning - your first complete greeting!', pronunciation: 'eh-kah-ah-ah-raw' },
            { yoruba: 'Báwo ni?', english: 'How are you? - notice the tone pattern', pronunciation: 'BAH-woh nee' },
            { yoruba: 'Mo wà pá', english: 'I am fine - practicing mid and high tones', pronunciation: 'moh wah PAH' },
            { yoruba: 'Ẹ ṣé púpọ̀', english: 'Thank you very much - combining all elements', pronunciation: 'eh-SHEH poo-paw' }
          ]
        },
        exercises: [
          {
            id: 'comprehensive-1',
            type: 'multiple-choice',
            question: 'Which word means "the Yoruba language" with correct tones?',
            correctAnswer: 'Yorùbá',
            options: ['Yoruba', 'Yórúbá', 'Yorùbá', 'Yòrùbà'],
          },
          {
            id: 'comprehensive-2',
            type: 'translation',
            question: 'How would you greet someone in the morning using proper Yoruba?',
            correctAnswer: 'Ẹ káàárọ̀',
            options: ['Ẹ káàárọ̀', 'E kaaro', 'Ẹ káálẹ́', 'Báwo ni'],
          },
          {
            id: 'comprehensive-3',
            type: 'multiple-choice',
            question: 'What are the three most important things to remember when learning Yoruba?',
            correctAnswer: 'Tones, special letters, and pronunciation',
            options: ['Grammar, vocabulary, and spelling', 'Tones, special letters, and pronunciation', 'Reading, writing, and speaking', 'Listening, memorizing, and practicing'],
          },
          {
            id: 'comprehensive-4',
            type: 'multiple-choice',
            question: 'What should you do if you make mistakes while learning Yoruba?',
            correctAnswer: 'Don\'t be afraid - mistakes are part of learning',
            options: ['Don\'t be afraid - mistakes are part of learning', 'Stop practicing immediately', 'Only speak when perfect', 'Avoid talking to native speakers'],
          },
          {
            id: 'comprehensive-5',
            type: 'multiple-choice',
            question: 'How often should you practice Yoruba for best results?',
            correctAnswer: 'Even 5 minutes daily helps',
            options: ['Even 5 minutes daily helps', 'Only on weekends', 'Once a month is enough', 'Only when you feel like it'],
          },
          {
            id: 'comprehensive-6',
            type: 'multiple-choice',
            question: 'What makes Yoruba a "musical" language?',
            correctAnswer: 'The tone system creates melody in speech',
            options: ['The tone system creates melody in speech', 'It\'s always sung, never spoken', 'It uses musical instruments', 'It has rhythm but no melody'],
          },
          {
            id: 'comprehensive-7',
            type: 'translation',
            question: 'How do you say "How are you?" in Yoruba?',
            correctAnswer: 'Báwo ni?',
            options: ['Báwo ni?', 'Ẹ káàárọ̀', 'Mo wà pá', 'Ẹ ṣé'],
          },
          {
            id: 'comprehensive-8',
            type: 'translation',
            question: 'How do you respond "I am fine" in Yoruba?',
            correctAnswer: 'Mo wà pá',
            options: ['Mo wà pá', 'Báwo ni?', 'Ẹ ṣé', 'Ẹ káàárọ̀'],
          },
          {
            id: 'comprehensive-9',
            type: 'multiple-choice',
            question: 'What cultural significance does learning Yoruba have?',
            correctAnswer: 'It connects you with a rich heritage of 40+ million speakers',
            options: ['It connects you with a rich heritage of 40+ million speakers', 'It\'s only useful for academic purposes', 'It has no modern relevance', 'It\'s only spoken in museums'],
          },
          {
            id: 'comprehensive-10',
            type: 'multiple-choice',
            question: 'With your Yoruba foundation, you\'re now ready to:',
            correctAnswer: 'Learn vocabulary and start simple conversations',
            options: ['Learn vocabulary and start simple conversations', 'Become a professional translator', 'Teach others immediately', 'Write complex literature'],
          },
        ],
        xpReward: 30,
        isCompleted: false,
        isLocked: true,
      },

      {
        id: 'unit-0-story',
        title: 'Short Story: Amara\'s First Yoruba Lesson',
        category: 'unit-0-language-basics',
        icon: '📖',
        color: '#4A235A',
        exercises: [createStoryExercise('unit-0', {
          text: 'Amara walks into her first Yoruba class, excited but nervous. "Welcome to learning _____!" says her teacher, Professor Adebayo. "Today we\'ll start with the foundation - the alphabet and sounds." He writes on the board: "The letter _____ has a dot underneath and sounds like \'aw\' in \'thought\'." Amara practices carefully. "Now, remember," the professor continues, "_____ are crucial in Yoruba. The word \'_____\' with a high tone means \'to meet\', but \'_____\' with a low tone means \'to perch\'." Amara nods, understanding this is different from English. "The _____ sound might seem strange - it\'s like saying G and B at exactly the same time," he demonstrates. After an hour of practice, Amara realizes that mastering the _____ system and special letters will be the key to speaking Yoruba authentically. "This language is like music!" she exclaims.',
          blanks: [
            { position: 0, answer: 'Yorùbá', options: ['Yorùbá', 'English', 'French', 'Hausa'] },
            { position: 1, answer: 'Ọ', options: ['Ọ', 'O', 'Ó', 'Ò'] },
            { position: 2, answer: 'tones', options: ['tones', 'letters', 'words', 'accents'] },
            { position: 3, answer: 'bá', options: ['bá', 'bà', 'ba', 'bí'] },
            { position: 4, answer: 'bà', options: ['bà', 'bá', 'ba', 'bí'] },
            { position: 5, answer: 'GB', options: ['GB', 'KP', 'Ṣ', 'GH'] },
            { position: 6, answer: 'tone', options: ['tone', 'alphabet', 'grammar', 'vocabulary'] }
          ],
          comprehensionQuestion: 'What does Amara compare the Yoruba language to at the end of the lesson?',
          comprehensionAnswer: 'Music',
          comprehensionOptions: ['Music', 'Mathematics', 'Art', 'Dancing']
        })],
        xpReward: 35,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-1-basics',
    name: 'Unit 1: Getting Started',
    color: '#58CC02',
    icon: '🌟',
    vocabulary: [...greetingsWords, ...numbersWords, ...personalDetailsWords, ...familyWords],
    lessons: [
      {
        id: 'greetings-1',
        title: 'Basic Greetings',
        category: 'unit-1-basics',
        icon: '👋',
        color: '#58CC02',
        exercises: createExercises(greetingsWords.slice(0, 4), 'greet1'),
        xpReward: 10,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'greetings-2',
        title: 'Polite Phrases',
        category: 'unit-1-basics',
        icon: '🤝',
        color: '#58CC02',
        exercises: createExercises(greetingsWords.slice(4), 'greet2'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'numbers-1',
        title: 'Numbers 1-5',
        category: 'unit-1-basics',
        icon: '1️⃣',
        color: '#FF9600',
        exercises: createExercises(numbersWords.slice(0, 5), 'num1'),
        xpReward: 10,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'numbers-2',
        title: 'Numbers 6-10',
        category: 'unit-1-basics',
        icon: '🔟',
        color: '#FF9600',
        exercises: createExercises(numbersWords.slice(5), 'num2'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'personal-1',
        title: 'Personal Details',
        category: 'unit-1-basics',
        icon: '👤',
        color: '#FF6B6B',
        exercises: createExercises(personalDetailsWords, 'personal1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-1-story',
        title: 'Short Story: Meeting Someone New',
        category: 'unit-1-basics',
        icon: '📖',
        color: '#FF6B6B',
        exercises: [createStoryExercise('unit-1', {
          text: 'Adé walks into a new office. He sees a woman at the desk. "_____ ni?" he says politely. "Mo wà pá, ẹ ṣé," she replies with a smile. "_____ mi ni Adé," he introduces himself. "Orúkọ mi ni Bísí," she responds. They shake hands. "_____ mélòó ni ọ?" Bísí asks. "Ọdún mẹ́tàlélógún ni mi," Adé answers. "Ọmọ _____ ni mi," he adds proudly.',
          blanks: [
            { position: 0, answer: 'Báwo', options: ['Báwo', 'Orúkọ', 'Ọjọ́', 'Àkókò'] },
            { position: 1, answer: 'Orúkọ', options: ['Orúkọ', 'Báwo', 'Ọdún', 'Ìlú'] },
            { position: 2, answer: 'Ọdún', options: ['Ọdún', 'Orúkọ', 'Báwo', 'Àkókò'] },
            { position: 3, answer: 'Nàìjíríà', options: ['Nàìjíríà', 'Àmẹ́ríkà', 'Gẹ̀ẹ́sì', 'Faransé'] }
          ],
          comprehensionQuestion: 'What did Adé and Bísí do after introducing themselves?',
          comprehensionAnswer: 'They shook hands',
          comprehensionOptions: ['They shook hands', 'They hugged', 'They waved', 'They bowed']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-2-people',
    name: 'Unit 2: People & Relationships',
    color: '#CE82FF',
    icon: '👥',
    vocabulary: [...familyWords, ...describingWords],
    lessons: [
      {
        id: 'family-1',
        title: 'Family Members',
        category: 'unit-2-people',
        icon: '👨‍👩‍👧',
        color: '#CE82FF',
        exercises: createExercises(familyWords, 'fam1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'describing-1',
        title: 'Describing People',
        category: 'unit-2-people',
        icon: '📝',
        color: '#4ECDC4',
        exercises: createExercises(describingWords.slice(0, 6), 'describing1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'describing-2',
        title: 'Describing Objects',
        category: 'unit-2-people',
        icon: '📋',
        color: '#4ECDC4',
        exercises: createExercises(describingWords.slice(6), 'describing2'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-2-story',
        title: 'Short Story: Family Gathering',
        category: 'unit-2-people',
        icon: '📖',
        color: '#4ECDC4',
        exercises: [createStoryExercise('unit-2', {
          text: 'At the family reunion, Kemi looks around at her relatives. Her _____ sits in the big chair, telling stories to the children. Her _____ is in the kitchen, preparing the feast. Kemi\'s _____ runs around playing with the other kids. "Your family is very _____," says her friend Tunde. "Yes, and my _____ is the tallest person here," Kemi points to her older brother.',
          blanks: [
            { position: 0, answer: 'bàbá', options: ['bàbá', 'ìyá', 'ọmọ', 'ẹ̀gbọ́n'] },
            { position: 1, answer: 'ìyá', options: ['ìyá', 'bàbá', 'àbúrò', 'ọkọ'] },
            { position: 2, answer: 'àbúrò', options: ['àbúrò', 'ẹ̀gbọ́n', 'bàbá', 'aya'] },
            { position: 3, answer: 'lẹ́wà', options: ['lẹ́wà', 'burúkú', 'kékeré', 'àtijọ́'] },
            { position: 4, answer: 'ẹ̀gbọ́n', options: ['ẹ̀gbọ́n', 'àbúrò', 'bàbá', 'ọmọ'] }
          ],
          comprehensionQuestion: 'Where was Kemi\'s mother during the family gathering?',
          comprehensionAnswer: 'In the kitchen preparing food',
          comprehensionOptions: ['In the kitchen preparing food', 'Sitting in the big chair', 'Playing with children', 'Talking to guests']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-3-daily-life',
    name: 'Unit 3: Daily Life',
    color: '#00CD9C',
    icon: '🏠',
    vocabulary: [...foodWords, ...clothingWords, ...possessionsWords, ...dailyRoutinesWords],
    lessons: [
      {
        id: 'food-1',
        title: 'Common Foods',
        category: 'unit-3-daily-life',
        icon: '🍚',
        color: '#00CD9C',
        exercises: createExercises(foodWords, 'food1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'clothing-1',
        title: 'Clothes & Accessories',
        category: 'unit-3-daily-life',
        icon: '👔',
        color: '#9370DB',
        exercises: createExercises(clothingWords, 'clothing1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'possessions-1',
        title: 'Possessions & Belongings',
        category: 'unit-3-daily-life',
        icon: '🏠',
        color: '#45B7D1',
        exercises: createExercises(possessionsWords, 'possessions1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'routines-1',
        title: 'Daily Routines',
        category: 'unit-3-daily-life',
        icon: '⏰',
        color: '#96CEB4',
        exercises: createExercises(dailyRoutinesWords, 'routines1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-3-story',
        title: 'Short Story: A Typical Day',
        category: 'unit-3-daily-life',
        icon: '📖',
        color: '#96CEB4',
        exercises: [createStoryExercise('unit-3', {
          text: 'Folake wakes up early. She puts on her favorite _____ and _____ before leaving the house. At work, she keeps her _____ in her desk drawer and her _____ in her bag. For lunch, she enjoys _____ with some vegetables. After work, she goes to the market to buy ingredients for dinner. "I need to _____ some fresh fish," she thinks as she walks home.',
          blanks: [
            { position: 0, answer: 'ẹ̀wù', options: ['ẹ̀wù', 'ṣòkòtò', 'bàtà', 'fìlà'] },
            { position: 1, answer: 'bàtà', options: ['bàtà', 'gẹ̀lẹ̀', 'aṣọ', 'agbádá'] },
            { position: 2, answer: 'fóònù', options: ['fóònù', 'owó', 'ìwé', 'àpò'] },
            { position: 3, answer: 'owó', options: ['owó', 'ìwé', 'kẹ̀kẹ́', 'ilé'] },
            { position: 4, answer: 'irẹsì', options: ['irẹsì', 'ẹ̀wà', 'iṣu', 'àgbàdo'] },
            { position: 5, answer: 'rà', options: ['rà', 'tà', 'jẹun', 'mu'] }
          ],
          comprehensionQuestion: 'What does Folake plan to buy at the market?',
          comprehensionAnswer: 'Fresh fish for dinner',
          comprehensionOptions: ['Fresh fish for dinner', 'Vegetables for lunch', 'New clothes', 'A new phone']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-4-world-around',
    name: 'Unit 4: The World Around Us',
    color: '#FF4B4B',
    icon: '🌍',
    vocabulary: [...colorsWords, ...bodyPartsWords, ...animalsWords, ...weatherWords, ...timeWords],
    lessons: [
      {
        id: 'colors-1',
        title: 'Basic Colors',
        category: 'unit-4-world-around',
        icon: '🌈',
        color: '#FF4B4B',
        exercises: createExercises(colorsWords, 'colors1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'body-1',
        title: 'Body Parts',
        category: 'unit-4-world-around',
        icon: '👁️',
        color: '#FFC0CB',
        exercises: createExercises(bodyPartsWords, 'body1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'animals-1',
        title: 'Common Animals',
        category: 'unit-4-world-around',
        icon: '🐕',
        color: '#8B4513',
        exercises: createExercises(animalsWords, 'animals1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'weather-1',
        title: 'Weather & Climate',
        category: 'unit-4-world-around',
        icon: '☀️',
        color: '#87CEEB',
        exercises: createExercises(weatherWords, 'weather1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'time-1',
        title: 'Time & Periods',
        category: 'unit-4-world-around',
        icon: '🕐',
        color: '#DAA520',
        exercises: createExercises(timeWords, 'time1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-4-story',
        title: 'Short Story: A Walk in Nature',
        category: 'unit-4-world-around',
        icon: '📖',
        color: '#87CEEB',
        exercises: [createStoryExercise('unit-4', {
          text: 'It is a beautiful _____ morning. The _____ is shining brightly in the sky. Taiwo decides to take a walk. He sees a _____ dog playing in the grass and a _____ cat sleeping under a tree. The flowers are many different colors - _____, _____, and white. As he walks, he uses his _____ to see the birds and his _____ to hear them singing. By _____, the weather becomes very hot, so he returns home.',
          blanks: [
            { position: 0, answer: 'àárọ̀', options: ['àárọ̀', 'alẹ́', 'òru', 'ọ̀sán'] },
            { position: 1, answer: 'oòrùn', options: ['oòrùn', 'òjò', 'àwọsánmà', 'afẹ́fẹ́'] },
            { position: 2, answer: 'dúdú', options: ['dúdú', 'funfun', 'pupa', 'bulúù'] },
            { position: 3, answer: 'funfun', options: ['funfun', 'dúdú', 'ofeefee', 'àlùkò'] },
            { position: 4, answer: 'pupa', options: ['pupa', 'dúdú', 'funfun', 'bulúù'] },
            { position: 5, answer: 'ofeefee', options: ['ofeefee', 'àlùkò', 'aláwọ̀ ewé', 'dúdú'] },
            { position: 6, answer: 'ojú', options: ['ojú', 'etí', 'imú', 'ẹnu'] },
            { position: 7, answer: 'etí', options: ['etí', 'ojú', 'ọwọ́', 'ẹsẹ̀'] },
            { position: 8, answer: 'ọ̀sán', options: ['ọ̀sán', 'àárọ̀', 'alẹ́', 'òru'] }
          ],
          comprehensionQuestion: 'Why did Taiwo return home in the afternoon?',
          comprehensionAnswer: 'Because the weather became very hot',
          comprehensionOptions: ['Because the weather became very hot', 'Because it started raining', 'Because he was tired', 'Because it got dark']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-5-personal-background',
    name: 'Unit 5: Personal Background',
    color: '#8E44AD',
    icon: '👨‍💼',
    vocabulary: [...personalBackgroundWords],
    lessons: [
      {
        id: 'profession-1',
        title: 'Jobs & Professions',
        category: 'unit-5-personal-background',
        icon: '💼',
        color: '#8E44AD',
        exercises: createExercises(personalBackgroundWords.slice(0, 6), 'profession1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'origin-1',
        title: 'Where You Come From',
        category: 'unit-5-personal-background',
        icon: '🗺️',
        color: '#3498DB',
        exercises: createExercises(personalBackgroundWords.slice(6, 11), 'origin1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'status-1',
        title: 'Personal Status',
        category: 'unit-5-personal-background',
        icon: '💍',
        color: '#E74C3C',
        exercises: createExercises(personalBackgroundWords.slice(11), 'status1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-5-story',
        title: 'Short Story: Job Interview',
        category: 'unit-5-personal-background',
        icon: '📖',
        color: '#E74C3C',
        exercises: [createStoryExercise('unit-5', {
          text: 'Yemi arrives at the company for her job interview. "Good morning, what is your _____?" asks the interviewer. "My name is Yemi," she replies confidently. "What is your _____?" he continues. "I am a _____," she answers. "Where do you _____ from?" "I come from Lagos, a big _____ in Nigeria," Yemi explains. The interviewer nods approvingly.',
          blanks: [
            { position: 0, answer: 'orúkọ', options: ['orúkọ', 'iṣẹ́', 'ìlú', 'ọjọ́ orí'] },
            { position: 1, answer: 'iṣẹ́', options: ['iṣẹ́', 'orúkọ', 'ìlú', 'ọmọ orílẹ̀-èdè'] },
            { position: 2, answer: 'olùkọ́', options: ['olùkọ́', 'dókítà', 'agbẹ̀', 'akẹ́kọ̀ọ́'] },
            { position: 3, answer: 'wá', options: ['wá', 'lọ', 'gbé', 'jókòó'] },
            { position: 4, answer: 'ìlú', options: ['ìlú', 'abúlé', 'oko', 'ilé'] }
          ],
          comprehensionQuestion: 'What profession does Yemi have?',
          comprehensionAnswer: 'She is a teacher',
          comprehensionOptions: ['She is a teacher', 'She is a doctor', 'She is a farmer', 'She is a student']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-6-shopping',
    name: 'Unit 6: Shopping',
    color: '#F39C12',
    icon: '🛒',
    vocabulary: [...shoppingWords],
    lessons: [
      {
        id: 'market-1',
        title: 'At the Market',
        category: 'unit-6-shopping',
        icon: '🏪',
        color: '#F39C12',
        exercises: createExercises(shoppingWords.slice(0, 6), 'market1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'bargaining-1',
        title: 'Bargaining & Prices',
        category: 'unit-6-shopping',
        icon: '💰',
        color: '#27AE60',
        exercises: createExercises(shoppingWords.slice(6, 12), 'bargaining1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'food-shopping-1',
        title: 'Food Shopping',
        category: 'unit-6-shopping',
        icon: '🥬',
        color: '#16A085',
        exercises: createExercises(shoppingWords.slice(12), 'foodshopping1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-6-story',
        title: 'Short Story: At the Market',
        category: 'unit-6-shopping',
        icon: '📖',
        color: '#16A085',
        exercises: [createStoryExercise('unit-6', {
          text: 'Adunni goes to the _____ to buy food for the week. She approaches a vendor selling fresh vegetables. "What is the _____ of these tomatoes?" she asks. "They are fifty naira per basket," replies the _____. "That is too expensive! Can you _____ the price?" Adunni negotiates. After some bargaining, she successfully _____ the tomatoes for forty naira. She puts them in her _____ and continues shopping.',
          blanks: [
            { position: 0, answer: 'ọjà', options: ['ọjà', 'ilé', 'ọ̀fíìsì', 'oko'] },
            { position: 1, answer: 'iye owó', options: ['iye owó', 'àwọn nǹkan', 'àpò', 'oníṣòwò'] },
            { position: 2, answer: 'oníṣòwò', options: ['oníṣòwò', 'onírà', 'àpò', 'iye owó'] },
            { position: 3, answer: 'dín owó kù', options: ['dín owó kù', 'ṣòro', 'rà', 'tà'] },
            { position: 4, answer: 'rà', options: ['rà', 'tà', 'dín owó kù', 'ṣòro'] },
            { position: 5, answer: 'àpò', options: ['àpò', 'ọjà', 'owó', 'iye owó'] }
          ],
          comprehensionQuestion: 'How much did Adunni finally pay for the tomatoes?',
          comprehensionAnswer: 'Forty naira',
          comprehensionOptions: ['Forty naira', 'Fifty naira', 'Thirty naira', 'Sixty naira']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-7-local-geography',
    name: 'Unit 7: Local Geography',
    color: '#2ECC71',
    icon: '🗺️',
    vocabulary: [...localGeographyWords],
    lessons: [
      {
        id: 'places-1',
        title: 'Places in Town',
        category: 'unit-7-local-geography',
        icon: '🏘️',
        color: '#2ECC71',
        exercises: createExercises(localGeographyWords.slice(0, 5), 'places1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'landmarks-1',
        title: 'Local Landmarks',
        category: 'unit-7-local-geography',
        icon: '🏛️',
        color: '#27AE60',
        exercises: createExercises(localGeographyWords.slice(5, 10), 'landmarks1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'directions-1',
        title: 'Giving Directions',
        category: 'unit-7-local-geography',
        icon: '🧭',
        color: '#16A085',
        exercises: createExercises(localGeographyWords.slice(10), 'directions1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-7-story',
        title: 'Short Story: Exploring the Town',
        category: 'unit-7-local-geography',
        icon: '📖',
        color: '#16A085',
        exercises: [createStoryExercise('unit-7', {
          text: 'Kola is new to the town and wants to explore. He walks down the main _____ and sees many interesting places. "Where is the _____?" he asks a local person. "It is _____ by the river," they reply, pointing in the direction. Kola continues walking and finds a beautiful _____ where the king once lived. From there, he can see the _____ flowing peacefully and the _____ rising in the distance.',
          blanks: [
            { position: 0, answer: 'òpópónà', options: ['òpópónà', 'ọ̀nà', 'ìlú', 'abúlé'] },
            { position: 1, answer: 'ọjà', options: ['ọjà', 'àfin', 'odò', 'òkè'] },
            { position: 2, answer: 'níbẹ̀', options: ['níbẹ̀', 'níbí', 'níbo', 'nílẹ̀'] },
            { position: 3, answer: 'àfin', options: ['àfin', 'ọjà', 'igbó', 'oko'] },
            { position: 4, answer: 'odò', options: ['odò', 'òkè', 'igbó', 'ìlú'] },
            { position: 5, answer: 'òkè', options: ['òkè', 'odò', 'àfin', 'ọjà'] }
          ],
          comprehensionQuestion: 'What could Kola see from the palace?',
          comprehensionAnswer: 'The river and hills in the distance',
          comprehensionOptions: ['The river and hills in the distance', 'Only the market square', 'The forest and farms', 'Just the main street']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-8-employment',
    name: 'Unit 8: Employment',
    color: '#34495E',
    icon: '💼',
    vocabulary: [...employmentWords],
    lessons: [
      {
        id: 'workplace-1',
        title: 'At the Workplace',
        category: 'unit-8-employment',
        icon: '🏢',
        color: '#34495E',
        exercises: createExercises(employmentWords.slice(0, 5), 'workplace1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'salary-1',
        title: 'Salary & Benefits',
        category: 'unit-8-employment',
        icon: '💰',
        color: '#2C3E50',
        exercises: createExercises(employmentWords.slice(5, 10), 'salary1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'work-schedule-1',
        title: 'Work Schedule',
        category: 'unit-8-employment',
        icon: '📅',
        color: '#7F8C8D',
        exercises: createExercises(employmentWords.slice(10), 'schedule1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-8-story',
        title: 'Short Story: First Day at Work',
        category: 'unit-8-employment',
        icon: '📖',
        color: '#7F8C8D',
        exercises: [createStoryExercise('unit-8', {
          text: 'Today is Funmi\'s first day at her new _____. She arrives at the _____ building early in the morning. Her _____ welcomes her warmly and shows her around. "Your _____ will be from 8 AM to 5 PM," he explains. "You will receive your _____ at the end of each month." During her lunch _____, Funmi meets her new colleagues and feels excited about her new job.',
          blanks: [
            { position: 0, answer: 'iṣẹ́', options: ['iṣẹ́', 'ilé', 'ọjà', 'ìlú'] },
            { position: 1, answer: 'ọ̀fíìsì', options: ['ọ̀fíìsì', 'ilé iṣẹ́', 'ọjà', 'àfin'] },
            { position: 2, answer: 'olùdarí', options: ['olùdarí', 'oṣiṣẹ́', 'onírà', 'akẹ́kọ̀ọ́'] },
            { position: 3, answer: 'àkókò iṣẹ́', options: ['àkókò iṣẹ́', 'owó oṣù', 'ìsinmi', 'àjọ'] },
            { position: 4, answer: 'owó oṣù', options: ['owó oṣù', 'owó ọjọ́', 'àkókò iṣẹ́', 'ìsinmi'] },
            { position: 5, answer: 'ìsinmi', options: ['ìsinmi', 'àjọ', 'iṣẹ́', 'àkókò iṣẹ́'] }
          ],
          comprehensionQuestion: 'When will Funmi receive her salary?',
          comprehensionAnswer: 'At the end of each month',
          comprehensionOptions: ['At the end of each month', 'Every day', 'Every week', 'Twice a month']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'unit-9-hobbies-leisure',
    name: 'Unit 9: Hobbies & Leisure',
    color: '#E67E22',
    icon: '🎯',
    vocabulary: [...hobbiesLeisureWords],
    lessons: [
      {
        id: 'entertainment-1',
        title: 'Entertainment & Fun',
        category: 'unit-9-hobbies-leisure',
        icon: '🎭',
        color: '#E67E22',
        exercises: createExercises(hobbiesLeisureWords.slice(0, 5), 'entertainment1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'sports-music-1',
        title: 'Sports & Music',
        category: 'unit-9-hobbies-leisure',
        icon: '⚽',
        color: '#D35400',
        exercises: createExercises(hobbiesLeisureWords.slice(5, 10), 'sportsmusic1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'activities-1',
        title: 'Daily Activities',
        category: 'unit-9-hobbies-leisure',
        icon: '🏃',
        color: '#E74C3C',
        exercises: createExercises(hobbiesLeisureWords.slice(10), 'activities1'),
        xpReward: 15,
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'unit-9-story',
        title: 'Short Story: Weekend Fun',
        category: 'unit-9-hobbies-leisure',
        icon: '📖',
        color: '#E74C3C',
        exercises: [createStoryExercise('unit-9', {
          text: 'It\'s Saturday morning and Seun has some _____ time. He decides to call his friends to play _____. After the game, they listen to _____ and watch some people _____. In the evening, Seun enjoys _____ a book at home. His sister is in the kitchen _____ dinner. "What a perfect day for relaxation and _____!" he thinks to himself.',
          blanks: [
            { position: 0, answer: 'àkókò ìsinmi', options: ['àkókò ìsinmi', 'àkókò iṣẹ́', 'ìgbádùn', 'eré'] },
            { position: 1, answer: 'bọ́ọ̀lù', options: ['bọ́ọ̀lù', 'orin', 'ijó', 'kíkà ìwé'] },
            { position: 2, answer: 'orin', options: ['orin', 'ijó', 'bọ́ọ̀lù', 'fífọ́tò'] },
            { position: 3, answer: 'ijó', options: ['ijó', 'orin', 'kíkà ìwé', 'ṣíṣe oúnjẹ'] },
            { position: 4, answer: 'kíkà ìwé', options: ['kíkà ìwé', 'wíwò tẹlifíṣọ̀n', 'ṣíṣe oúnjẹ', 'rírìn àjò'] },
            { position: 5, answer: 'ṣíṣe oúnjẹ', options: ['ṣíṣe oúnjẹ', 'kíkà ìwé', 'ijó', 'gbígbin'] },
            { position: 6, answer: 'ìgbádùn', options: ['ìgbádùn', 'iṣẹ́', 'àjọ', 'ìsinmi'] }
          ],
          comprehensionQuestion: 'What did Seun do in the evening?',
          comprehensionAnswer: 'He read a book at home',
          comprehensionOptions: ['He read a book at home', 'He played football', 'He listened to music', 'He cooked dinner']
        })],
        xpReward: 25,
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
];

export const getAllLessons = () => {
  return categories.flatMap(category => category.lessons);
};