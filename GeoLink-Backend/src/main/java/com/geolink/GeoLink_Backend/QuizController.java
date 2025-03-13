package com.geolink.GeoLink_Backend;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access API
@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private static final Map<String, List<QuizQuestion>> quizData = new HashMap<>();

    static {
        quizData.put("Afghanistan", List.of(
            new QuizQuestion("Which empire influenced Afghanistan's ancient history?",
                             List.of("Roman Empire", "Persian Empire", "British Empire", "Mughal Empire"),
                             "Persian Empire"),
            new QuizQuestion("Afghanistan was a key point along which ancient trade route?",
                             List.of("Silk Road", "Amber Road", "Spice Route", "Trans-Saharan Route"),
                             "Silk Road"),
            new QuizQuestion("What is the capital of Afghanistan?",
                             List.of("Tehran", "Islamabad", "Kabul", "Baghdad"),
                             "Kabul")
        ));

        quizData.put("Armenia", List.of(
            new QuizQuestion("Armenia was the first nation to adopt which religion?",
                             List.of("Islam", "Buddhism", "Christianity", "Hinduism"),
                             "Christianity"),
            new QuizQuestion("In which year did Armenia officially adopt Christianity?",
                             List.of("301 AD", "476 AD", "632 AD", "1054 AD"),
                             "301 AD"),
            new QuizQuestion("What is the capital of Armenia?",
                             List.of("Baku", "Tbilisi", "Yerevan", "Ankara"),
                             "Yerevan")
        ));

        quizData.put("Azerbaijan", List.of(
            new QuizQuestion("Which body of water borders Azerbaijan to the east?",
                             List.of("Black Sea", "Caspian Sea", "Mediterranean Sea", "Red Sea"),
                             "Caspian Sea"),
            new QuizQuestion("What is the capital of Azerbaijan?",
                             List.of("Baku", "Tbilisi", "Yerevan", "Almaty"),
                             "Baku"),
            new QuizQuestion("Azerbaijan is known for producing which of the following?",
                             List.of("Caviar", "Coffee", "Spices", "Cotton"),
                             "Caviar")
        ));

        quizData.put("Bahrain", List.of(
            new QuizQuestion("What is the capital of Bahrain?",
                             List.of("Doha", "Manama", "Kuwait City", "Muscat"),
                             "Manama"),
            new QuizQuestion("Bahrain is an island nation in which body of water?",
                             List.of("Persian Gulf", "Red Sea", "Arabian Sea", "Mediterranean Sea"),
                             "Persian Gulf"),
            new QuizQuestion("What is the official language of Bahrain?",
                             List.of("Arabic", "English", "Persian", "Hindi"),
                             "Arabic")
        ));

        quizData.put("Bangladesh", List.of(
            new QuizQuestion("Which river is the longest in Bangladesh?",
                             List.of("Ganges", "Yangtze", "Brahmaputra", "Amazon"),
                             "Brahmaputra"),
            new QuizQuestion("What is the capital of Bangladesh?",
                             List.of("Dhaka", "Kathmandu", "Colombo", "Islamabad"),
                             "Dhaka"),
            new QuizQuestion("Bangladesh shares a border with which country?",
                             List.of("India", "Pakistan", "China", "Nepal"),
                             "India")
        ));

        quizData.put("Bhutan", List.of(
            new QuizQuestion("Which of these is the capital of Bhutan?",
                             List.of("Thimphu", "Kathmandu", "Paro", "Dhaka"),
                             "Thimphu"),
            new QuizQuestion("Bhutan is known for measuring its happiness with what metric?",
                             List.of("Gross Domestic Product", "Gross National Happiness", "Human Development Index", "Environmental Quality Index"),
                             "Gross National Happiness"),
            new QuizQuestion("Which mountain range runs through Bhutan?",
                             List.of("Himalayas", "Andes", "Alps", "Rockies"),
                             "Himalayas")
        ));

        quizData.put("Brunei", List.of(
            new QuizQuestion("What is the capital of Brunei?",
                             List.of("Bandar Seri Begawan", "Kuala Lumpur", "Jakarta", "Manila"),
                             "Bandar Seri Begawan"),
            new QuizQuestion("Brunei is located on which island?",
                             List.of("Borneo", "Sumatra", "Java", "Luzon"),
                             "Borneo"),
            new QuizQuestion("Which industry plays a key role in Brunei’s economy?",
                             List.of("Oil and Gas", "Tourism", "Agriculture", "Fishing"),
                             "Oil and Gas")
        ));

        quizData.put("Cambodia", List.of(
            new QuizQuestion("Which ancient temple complex is located in Cambodia?",
                             List.of("Angkor Wat", "Petra", "Great Wall", "Machu Picchu"),
                             "Angkor Wat"),
            new QuizQuestion("What is the capital of Cambodia?",
                             List.of("Phnom Penh", "Hanoi", "Vientiane", "Bangkok"),
                             "Phnom Penh"),
            new QuizQuestion("What is the primary language spoken in Cambodia?",
                             List.of("Cambodian", "Vietnamese", "Thai", "Chinese"),
                             "Cambodian")
        ));

        quizData.put("China", List.of(
            new QuizQuestion("How long is the recorded history of China?",
                             List.of("Over 1,000 years", "Over 3,000 years", "Over 5,000 years", "Over 10,000 years"),
                             "Over 5,000 years"),
            new QuizQuestion("Which famous trade route connected China with Europe?",
                             List.of("Trans-Siberian Railway", "Silk Road", "Suez Canal", "Panama Canal"),
                             "Silk Road"),
            new QuizQuestion("What is the name of the first emperor of China?",
                             List.of("Qin Shi Huang", "Mao Zedong", "Sun Yat-sen", "Confucius"),
                             "Qin Shi Huang")
        ));

        quizData.put("Cyprus", List.of(
            new QuizQuestion("What is the capital of Cyprus?",
                             List.of("Nicosia", "Athens", "Rome", "Istanbul"),
                             "Nicosia"),
            new QuizQuestion("Which sea borders Cyprus?",
                             List.of("Mediterranean Sea", "Red Sea", "Aegean Sea", "Black Sea"),
                             "Mediterranean Sea"),
            new QuizQuestion("Which country is located to the north of Cyprus?",
                             List.of("Greece", "Turkey", "Syria", "Lebanon"),
                             "Turkey")
        ));

        quizData.put("Georgia", List.of(
            new QuizQuestion("What is the capital of Georgia?",
                             List.of("Tbilisi", "Baku", "Yerevan", "Ankara"),
                             "Tbilisi"),
            new QuizQuestion("Georgia is located on which continent?",
                             List.of("Asia", "Europe", "Africa", "Oceania"),
                             "Asia"),
            new QuizQuestion("Which mountain range forms part of Georgia's northern border?",
                             List.of("Alps", "Himalayas", "Caucasus", "Andes"),
                             "Caucasus")
        ));

        quizData.put("India", List.of(
            new QuizQuestion("Which ancient civilization was located in India?",
                             List.of("Mesopotamian", "Egyptian", "Indus Valley", "Mayan"),
                             "Indus Valley"),
            new QuizQuestion("Which of these religions originated in India?",
                             List.of("Christianity", "Islam", "Hinduism", "Judaism"),
                             "Hinduism"),
            new QuizQuestion("What is the capital of India?",
                             List.of("Mumbai", "Delhi", "Kolkata", "Chennai"),
                             "Delhi")
        ));

        quizData.put("Indonesia", List.of(
            new QuizQuestion("Which is the largest island in Indonesia?",
                             List.of("Java", "Sumatra", "Borneo", "New Guinea"),
                             "Borneo"),
            new QuizQuestion("What is the capital of Indonesia?",
                             List.of("Jakarta", "Bali", "Bandung", "Surabaya"),
                             "Jakarta"),
            new QuizQuestion("Which of these volcanoes is located in Indonesia?",
                             List.of("Mount Fuji", "Mount Vesuvius", "Mount Merapi", "Mount St. Helens"),
                             "Mount Merapi")
        ));

        quizData.put("Iran", List.of(
            new QuizQuestion("What is the capital of Iran?",
                             List.of("Tehran", "Baghdad", "Damascus", "Cairo"),
                             "Tehran"),
            new QuizQuestion("Iran was historically known by which name?",
                             List.of("Persia", "Cyrus", "Sumeria", "Babylonia"),
                             "Persia"),
            new QuizQuestion("Which famous empire ruled Iran in ancient times?",
                             List.of("Roman Empire", "Ottoman Empire", "Persian Empire", "Mongol Empire"),
                             "Persian Empire")
        ));

        quizData.put("Iraq", List.of(
            new QuizQuestion("What is the capital of Iraq?",
                             List.of("Baghdad", "Tehran", "Damascus", "Beirut"),
                             "Baghdad"),
            new QuizQuestion("Which river flows through Iraq?",
                             List.of("Euphrates", "Nile", "Amazon", "Indus"),
                             "Euphrates"),
            new QuizQuestion("Iraq was the center of which ancient civilization?",
                             List.of("Roman", "Egyptian", "Sumerian", "Greek"),
                             "Sumerian")
        ));
        quizData.put("Israel", List.of(
                new QuizQuestion("What is the capital of Israel?",
                                 List.of("Tel Aviv", "Jerusalem", "Haifa", "Eilat"),
                                 "Jerusalem"),
                new QuizQuestion("Which sea is to the west of Israel?",
                                 List.of("Dead Sea", "Red Sea", "Mediterranean Sea", "Black Sea"),
                                 "Mediterranean Sea"),
                new QuizQuestion("Israel is known as the birthplace of which religion?",
                                 List.of("Christianity", "Judaism", "Islam", "Buddhism"),
                             "Judaism")
        ));

        quizData.put("Japan", List.of(
            new QuizQuestion("Which period marked Japan's rapid modernization?",
                             List.of("Edo Period", "Meiji Restoration", "Heian Period", "Tokugawa Shogunate"),
                             "Meiji Restoration"),
            new QuizQuestion("What is the name of Japan’s traditional warrior class?",
                             List.of("Vikings", "Samurai", "Knights", "Mongols"),
                             "Samurai"),
            new QuizQuestion("What is the capital of Japan?",
                             List.of("Kyoto", "Osaka", "Tokyo", "Hiroshima"),
                             "Tokyo")
        ));

        quizData.put("Jordan", List.of(
            new QuizQuestion("What is the capital of Jordan?",
                             List.of("Amman", "Baghdad", "Damascus", "Cairo"),
                             "Amman"),
            new QuizQuestion("Which ancient city is located in Jordan?",
                             List.of("Petra", "Jericho", "Carthage", "Babylon"),
                             "Petra"),
            new QuizQuestion("Jordan shares a border with which of these countries?",
                             List.of("Israel", "Saudi Arabia", "Egypt", "All of the above"),
                             "All of the above")
        ));

        quizData.put("Kazakhstan", List.of(
            new QuizQuestion("What is the capital of Kazakhstan?",
                             List.of("Almaty", "Astana", "Tashkent", "Bishkek"),
                             "Astana"),
            new QuizQuestion("Kazakhstan is located in which two continents?",
                             List.of("Europe and Asia", "Asia and Africa", "Europe and Africa", "Asia and North America"),
                             "Europe and Asia"),
            new QuizQuestion("Which is the largest landlocked country in the world?",
                             List.of("Kazakhstan", "Mongolia", "Nepal", "Paraguay"),
                             "Kazakhstan")
        ));

        quizData.put("Kuwait", List.of(
            new QuizQuestion("What is the capital of Kuwait?",
                             List.of("Doha", "Muscat", "Kuwait City", "Riyadh"),
                             "Kuwait City"),
            new QuizQuestion("Kuwait borders which body of water?",
                             List.of("Red Sea", "Persian Gulf", "Mediterranean Sea", "Arabian Sea"),
                             "Persian Gulf"),
            new QuizQuestion("Kuwait was invaded by which country in 1990?",
                             List.of("Iran", "Iraq", "Saudi Arabia", "Jordan"),
                             "Iraq")
        ));

        quizData.put("Kyrgyzstan", List.of(
            new QuizQuestion("What is the capital of Kyrgyzstan?",
                             List.of("Tashkent", "Bishkek", "Almaty", "Dushanbe"),
                             "Bishkek"),
            new QuizQuestion("Kyrgyzstan is bordered by which country to the south?",
                             List.of("China", "Uzbekistan", "Kazakhstan", "Tajikistan"),
                             "Tajikistan"),
            new QuizQuestion("Kyrgyzstan is a part of which mountain range?",
                             List.of("Himalayas", "Caucasus", "Alps", "Tian Shan"),
                             "Tian Shan")
        ));

        quizData.put("Laos", List.of(
            new QuizQuestion("What is the capital of Laos?",
                             List.of("Vientiane", "Hanoi", "Bangkok", "Phnom Penh"),
                             "Vientiane"),
            new QuizQuestion("Which river runs through Laos?",
                             List.of("Mekong River", "Amazon River", "Yangtze River", "Ganges River"),
                             "Mekong River"),
            new QuizQuestion("Laos is bordered by which countries?",
                             List.of("Vietnam", "Thailand", "China", "All of the above"),
                             "All of the above")
        ));

        quizData.put("Lebanon", List.of(
            new QuizQuestion("What is the capital of Lebanon?",
                             List.of("Damascus", "Beirut", "Amman", "Cairo"),
                             "Beirut"),
            new QuizQuestion("Which sea borders Lebanon to the west?",
                             List.of("Mediterranean Sea", "Red Sea", "Dead Sea", "Aegean Sea"),
                             "Mediterranean Sea"),
            new QuizQuestion("Lebanon shares a border with which country?",
                             List.of("Israel", "Jordan", "Iraq", "Egypt"),
                             "Israel")
        ));
        
        quizData.put("Malaysia", List.of(
                new QuizQuestion("What is the capital of Malaysia?",
                                 List.of("Singapore", "Kuala Lumpur", "Manila", "Jakarta"),
                                 "Kuala Lumpur"),
                new QuizQuestion("Which body of water separates Peninsular Malaysia from Borneo?",
                                 List.of("Strait of Malacca", "Sunda Strait", "Celebes Sea", "South China Sea"),
                                 "South China Sea"),
                new QuizQuestion("What is the official language of Malaysia?",
                                 List.of("Malay", "English", "Mandarin", "Tamil"),
                             "Malay")
        ));

        quizData.put("Maldives", List.of(
            new QuizQuestion("What is the capital of the Maldives?",
                             List.of("Malé", "Colombo", "Dhaka", "Male"),
                             "Malé"),
            new QuizQuestion("The Maldives consists mainly of which natural feature?",
                             List.of("Mountains", "Deserts", "Islands", "Forests"),
                             "Islands"),
            new QuizQuestion("Which ocean surrounds the Maldives?",
                             List.of("Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Southern Ocean"),
                             "Indian Ocean")
        ));

        quizData.put("Mongolia", List.of(
            new QuizQuestion("What is the capital of Mongolia?",
                             List.of("Ulaanbaatar", "Almaty", "Bishkek", "Astana"),
                             "Ulaanbaatar"),
            new QuizQuestion("Mongolia is famous for which traditional lifestyle?",
                             List.of("Nomadic", "Sedentary", "Urbanized", "Seafaring"),
                             "Nomadic"),
            new QuizQuestion("Which of these animals is most closely associated with Mongolia?",
                             List.of("Camels", "Elephants", "Lions", "Penguins"),
                             "Camels")
        ));

        quizData.put("Myanmar", List.of(
            new QuizQuestion("What is the capital of Myanmar?",
                             List.of("Yangon", "Naypyidaw", "Mandalay", "Bago"),
                             "Naypyidaw"),
            new QuizQuestion("Myanmar is bordered by which country to the east?",
                             List.of("India", "China", "Vietnam", "Thailand"),
                             "Thailand"),
            new QuizQuestion("Which major river flows through Myanmar?",
                             List.of("Mekong River", "Irrawaddy River", "Ganges River", "Yangtze River"),
                             "Irrawaddy River")
        ));

        quizData.put("Nepal", List.of(
            new QuizQuestion("Which mountain is located in Nepal?",
                             List.of("K2", "Mount Everest", "Kanchenjunga", "Makalu"),
                             "Mount Everest"),
            new QuizQuestion("What is the capital of Nepal?",
                             List.of("Kathmandu", "Dhaka", "Thimphu", "Pokhara"),
                             "Kathmandu"),
            new QuizQuestion("Nepal shares a border with which two countries?",
                             List.of("India and China", "India and Bangladesh", "China and Pakistan", "India and Bhutan"),
                             "India and China")
        ));

        quizData.put("North Korea", List.of(
            new QuizQuestion("What is the capital of North Korea?",
                             List.of("Seoul", "Pyongyang", "Beijing", "Tokyo"),
                             "Pyongyang"),
            new QuizQuestion("Which river forms part of the border between North Korea and China?",
                             List.of("Yalu River", "Amur River", "Mekong River", "Tigris River"),
                             "Yalu River"),
            new QuizQuestion("North Korea's official ideology is called?",
                             List.of("Communism", "Juche", "Fascism", "Capitalism"),
                             "Juche")
        ));

        quizData.put("Oman", List.of(
            new QuizQuestion("What is the capital of Oman?",
                             List.of("Muscat", "Riyadh", "Doha", "Dubai"),
                             "Muscat"),
            new QuizQuestion("Oman is located on which body of water?",
                             List.of("Red Sea", "Persian Gulf", "Arabian Sea", "Indian Ocean"),
                             "Arabian Sea"),
            new QuizQuestion("Oman shares a border with which country to the west?",
                             List.of("Saudi Arabia", "Yemen", "Iraq", "Jordan"),
                             "Yemen")
        ));

        quizData.put("Pakistan", List.of(
            new QuizQuestion("What is the capital of Pakistan?",
                             List.of("Lahore", "Karachi", "Islamabad", "Peshawar"),
                             "Islamabad"),
            new QuizQuestion("Pakistan shares a border with which country to the east?",
                             List.of("India", "Afghanistan", "Iran", "China"),
                             "India"),
            new QuizQuestion("Which mountain range is located in Pakistan?",
                             List.of("Himalayas", "Andes", "Alps", "Hindu Kush"),
                             "Hindu Kush")
        ));

        quizData.put("Philippines", List.of(
            new QuizQuestion("What is the capital of the Philippines?",
                             List.of("Manila", "Davao", "Quezon City", "Cebu City"),
                             "Manila"),
            new QuizQuestion("The Philippines consists of how many islands?",
                             List.of("Over 7,000", "Over 10,000", "Over 3,000", "Over 5,000"),
                             "Over 7,000"),
            new QuizQuestion("What is the official language of the Philippines?",
                             List.of("English", "Filipino", "Spanish", "Tagalog"),
                             "Filipino")
        ));

        quizData.put("Qatar", List.of(
            new QuizQuestion("What is the capital of Qatar?",
                             List.of("Abu Dhabi", "Manama", "Doha", "Muscat"),
                             "Doha"),
            new QuizQuestion("Which body of water borders Qatar to the north?",
                             List.of("Persian Gulf", "Red Sea", "Indian Ocean", "Mediterranean Sea"),
                             "Persian Gulf"),
            new QuizQuestion("Qatar is known for producing which natural resource?",
                             List.of("Oil", "Gold", "Coal", "Diamonds"),
                             "Oil")
        ));

        quizData.put("Russia", List.of(
            new QuizQuestion("What is the capital of Russia?",
                             List.of("Moscow", "Saint Petersburg", "Kyiv", "Sochi"),
                             "Moscow"),
            new QuizQuestion("Which of these is a famous landmark in Russia?",
                             List.of("Eiffel Tower", "Great Wall", "Red Square", "Colosseum"),
                             "Red Square"),
            new QuizQuestion("Russia shares a border with which of these countries?",
                             List.of("China", "Canada", "Brazil", "Australia"),
                             "China")
        ));

        quizData.put("Saudi Arabia", List.of(
            new QuizQuestion("What is the capital of Saudi Arabia?",
                             List.of("Mecca", "Riyadh", "Jeddah", "Medina"),
                             "Riyadh"),
            new QuizQuestion("Saudi Arabia is known for producing which natural resource?",
                             List.of("Oil", "Gold", "Diamonds", "Iron"),
                             "Oil"),
            new QuizQuestion("Which desert is located in Saudi Arabia?",
                             List.of("Gobi Desert", "Sahara Desert", "Arabian Desert", "Atacama Desert"),
                             "Arabian Desert")
        ));

        quizData.put("Singapore", List.of(
            new QuizQuestion("What is the capital of Singapore?",
                             List.of("Singapore", "Kuala Lumpur", "Jakarta", "Manila"),
                             "Singapore"),
            new QuizQuestion("Singapore is known for which iconic structure?",
                             List.of("Eiffel Tower", "Marina Bay Sands", "Colosseum", "Great Wall of China"),
                             "Marina Bay Sands"),
            new QuizQuestion("Which type of government does Singapore have?",
                             List.of("Democratic", "Republic", "Monarchy", "One-party State"),
                             "One-party State")
        ));

        quizData.put("South Korea", List.of(
            new QuizQuestion("What is the capital of South Korea?",
                             List.of("Seoul", "Busan", "Incheon", "Daegu"),
                             "Seoul"),
            new QuizQuestion("Which river flows through South Korea?",
                             List.of("Han River", "Yangtze River", "Nile River", "Mekong River"),
                             "Han River"),
            new QuizQuestion("Which of these is a famous Korean dish?",
                             List.of("Pizza", "Sushi", "Kimchi", "Tacos"),
                             "Kimchi")
        ));
        
        quizData.put("Sri Lanka", List.of(
                new QuizQuestion("What is the capital of Sri Lanka?",
                                 List.of("Colombo", "Kandy", "Galle", "Jaffna"),
                                 "Colombo"),
                new QuizQuestion("Sri Lanka is an island nation located in which ocean?",
                                 List.of("Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"),
                                 "Indian Ocean"),
                new QuizQuestion("Which of these religions originated in Sri Lanka?",
                                 List.of("Buddhism", "Hinduism", "Christianity", "Islam"),
                                 "Buddhism")
            ));

        quizData.put("Syria", List.of(
            new QuizQuestion("What is the capital of Syria?",
                             List.of("Beirut", "Damascus", "Cairo", "Amman"),
                             "Damascus"),
            new QuizQuestion("Syria shares a border with which country to the south?",
                             List.of("Lebanon", "Jordan", "Saudi Arabia", "Iraq"),
                             "Jordan"),
            new QuizQuestion("Which ancient city is located in Syria?",
                             List.of("Petra", "Babylon", "Palmyra", "Jericho"),
                             "Palmyra")
        ));

        quizData.put("Tajikistan", List.of(
            new QuizQuestion("What is the capital of Tajikistan?",
                             List.of("Dushanbe", "Astana", "Bishkek", "Tashkent"),
                             "Dushanbe"),
            new QuizQuestion("Tajikistan is bordered by which major mountain range?",
                             List.of("Himalayas", "Alps", "Hindu Kush", "Tian Shan"),
                             "Hindu Kush"),
            new QuizQuestion("Which country borders Tajikistan to the north?",
                             List.of("Kyrgyzstan", "China", "Pakistan", "Iran"),
                             "Kyrgyzstan")
        ));

        quizData.put("Thailand", List.of(
            new QuizQuestion("What is the capital of Thailand?",
                             List.of("Bangkok", "Chiang Mai", "Phuket", "Koh Samui"),
                             "Bangkok"),
            new QuizQuestion("Thailand is known for its traditional dance form called?",
                             List.of("Kabuki", "Ballet", "Khon", "Hula"),
                             "Khon"),
            new QuizQuestion("Which body of water is located to the south of Thailand?",
                             List.of("Bay of Bengal", "Andaman Sea", "South China Sea", "Java Sea"),
                             "Andaman Sea")
        ));

        quizData.put("Timor-Leste", List.of(
            new QuizQuestion("What is the capital of Timor-Leste?",
                             List.of("Dili", "Manila", "Jakarta", "Banda Aceh"),
                             "Dili"),
            new QuizQuestion("Timor-Leste gained independence from which country in 2002?",
                             List.of("Portugal", "Australia", "Indonesia", "China"),
                             "Indonesia"),
            new QuizQuestion("Timor-Leste is located in which part of the world?",
                             List.of("Southeast Asia", "East Africa", "Middle East", "Central Asia"),
                             "Southeast Asia")
        ));

        quizData.put("Turkey", List.of(
            new QuizQuestion("What is the capital of Turkey?",
                             List.of("Ankara", "Istanbul", "Izmir", "Antalya"),
                             "Ankara"),
            new QuizQuestion("Turkey is located in which two continents?",
                             List.of("Europe and Asia", "Asia and Africa", "Europe and Africa", "Asia and Oceania"),
                             "Europe and Asia"),
            new QuizQuestion("Which famous ancient city is located in Turkey?",
                             List.of("Rome", "Babylon", "Athens", "Troy"),
                             "Troy")
        ));

        quizData.put("Turkmenistan", List.of(
            new QuizQuestion("What is the capital of Turkmenistan?",
                             List.of("Ashgabat", "Baku", "Tashkent", "Almaty"),
                             "Ashgabat"),
            new QuizQuestion("Turkmenistan is bordered by which country to the north?",
                             List.of("Kazakhstan", "Uzbekistan", "Iran", "Afghanistan"),
                             "Kazakhstan"),
            new QuizQuestion("Which desert is located in Turkmenistan?",
                             List.of("Karakum Desert", "Kyzylkum Desert", "Gobi Desert", "Sahara Desert"),
                             "Karakum Desert")
        ));

        quizData.put("United Arab Emirates", List.of(
            new QuizQuestion("What is the capital of the United Arab Emirates?",
                             List.of("Abu Dhabi", "Dubai", "Sharjah", "Ajman"),
                             "Abu Dhabi"),
            new QuizQuestion("Which of these is a famous landmark in the United Arab Emirates?",
                             List.of("Eiffel Tower", "Burj Khalifa", "Colosseum", "Great Wall of China"),
                             "Burj Khalifa"),
            new QuizQuestion("The UAE is a member of which regional organization?",
                             List.of("EU", "ASEAN", "GCC", "NAFTA"),
                             "GCC")
        ));

        quizData.put("Uzbekistan", List.of(
            new QuizQuestion("What is the capital of Uzbekistan?",
                             List.of("Tashkent", "Samarkand", "Bukhara", "Almaty"),
                             "Tashkent"),
            new QuizQuestion("Uzbekistan is famous for its historical cities, including?",
                             List.of("Machu Picchu", "Samarkand", "Cairo", "Jerusalem"),
                             "Samarkand"),
            new QuizQuestion("Uzbekistan shares a border with which of these countries?",
                             List.of("Russia", "China", "Pakistan", "Afghanistan"),
                             "Afghanistan")
        ));

        quizData.put("Vietnam", List.of(
            new QuizQuestion("What is the capital of Vietnam?",
                             List.of("Ho Chi Minh City", "Hanoi", "Da Nang", "Hue"),
                             "Hanoi"),
            new QuizQuestion("Which river flows through Vietnam?",
                             List.of("Yangtze River", "Mekong River", "Red River", "Nile River"),
                             "Mekong River"),
            new QuizQuestion("Vietnam is bordered by which country to the west?",
                             List.of("Cambodia", "Thailand", "Laos", "China"),
                             "Laos")
        ));

        quizData.put("Yemen", List.of(
            new QuizQuestion("What is the capital of Yemen?",
                             List.of("Sanaa", "Aden", "Taiz", "Mokha"),
                             "Sanaa"),
            new QuizQuestion("Yemen shares a border with which country to the east?",
                             List.of("Saudi Arabia", "Oman", "Ethiopia", "Djibouti"),
                             "Oman"),
            new QuizQuestion("What is the currency of Yemen?",
                             List.of("Yemeni Rial", "Saudi Riyal", "Omani Rial", "Yemeni Dollar"),
                             "Yemeni Rial")
        ));

        quizData.put("Zhejiang", List.of(
            new QuizQuestion("What is the capital of Zhejiang?",
                             List.of("Hangzhou", "Shanghai", "Beijing", "Xi'an"),
                             "Hangzhou"),
            new QuizQuestion("Zhejiang is located on which coast?",
                             List.of("East Coast", "West Coast", "South Coast", "North Coast"),
                             "East Coast"),
            new QuizQuestion("Which body of water borders Zhejiang to the east?",
                             List.of("Yellow Sea", "East China Sea", "South China Sea", "Bohai Sea"),
                             "East China Sea")
        ));
     
        // Additional countries can be added in the same way
    }

    @GetMapping("/{country}")
    public ResponseEntity<List<QuizQuestion>> getQuiz(@PathVariable String country) {
        return ResponseEntity.ok(quizData.getOrDefault(country, List.of()));
    }
}
