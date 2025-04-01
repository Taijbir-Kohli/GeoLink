package com.geolink.GeoLink_Backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access API
@RestController
public class CountryController {

    private static final Map<String, String> historyData = new HashMap<>();

    static {
        historyData.put("afghanistan", "Afghanistan has tall mountains and was part of the Silk Road, a super cool trade route from ancient times!");
        historyData.put("armenia", "Armenia was the first country in the world to officially become Christian!");
        historyData.put("azerbaijan", "Azerbaijan is called the Land of Fire because it has natural gas flames that burn from the ground!");
        historyData.put("bahrain", "Bahrain is a tiny island nation famous for pearls and ancient forts! Did you know pearls used to be more valuable than gold?");
        historyData.put("baikonur", "The Baikonur Cosmodrome is a spaceport operated by Russia within Kazakhstan.");
        historyData.put("bangladesh", "Bangladesh is home to the Royal Bengal Tiger and has the largest river delta in the world!");
        historyData.put("bhutan", "Bhutan measures happiness instead of money! It's full of beautiful mountains and Buddhist temples.");
        historyData.put("brunei", "Brunei has a golden palace with 1,788 rooms! Imagine playing hide and seek there!");
        historyData.put("cambodia", "Cambodia has Angkor Wat, one of the biggest temples in the world! It’s like a lost city from an adventure movie!");
        historyData.put("china", "China is home to pandas, the Great Wall, and kung fu! It also invented paper, fireworks, and noodles!");
        historyData.put("cyprus", "Cyprus has beautiful beaches and is known as the mythical birthplace of Aphrodite, the Greek goddess of love!");
        historyData.put("georgia", "Georgia has one of the oldest winemaking traditions in the world! Plus, they have their own unique alphabet!");
        historyData.put("india", "India gave us chess, yoga, and the Taj Mahal! It's also home to the spiciest foods and the Bollywood movie industry!");
        historyData.put("indonesia", "Indonesia has over 17,000 islands! It's also home to Komodo dragons – the biggest lizards in the world!");
        historyData.put("iran", "Iran, once called Persia, gave the world beautiful carpets, poetry, and Persian cats!");
        historyData.put("iraq", "Iraq is where some of the oldest civilizations started, including Mesopotamia, home to the first writing system!");
        historyData.put("israel", "Israel has some of the oldest cities in the world, including Jerusalem! It’s a special place for many religions.");
        historyData.put("japan", "Japan is the land of samurai, sushi, and ninjas! It also has Mount Fuji and invented video games!");
        historyData.put("jordan", "Jordan is home to Petra, a magical city carved into pink rocks!");
        historyData.put("kazakhstan", "Kazakhstan is where the first human went to space! It also has endless steppes (grasslands).");
        historyData.put("kuwait", "Kuwait is rich in oil and has some of the world’s tallest buildings!");
        historyData.put("kyrgyzstan", "Kyrgyzstan is full of mountains and people still live in yurts, which are cool round tents!");
        historyData.put("laos", "Laos is known as the Land of a Million Elephants! It's also famous for stunning waterfalls!");
        historyData.put("lebanon", "Lebanon is home to the oldest continuously inhabited city, Byblos! Plus, it has famous cedar trees!");
        historyData.put("malaysia", "Malaysia has rainforests full of monkeys! It’s also home to the tall Petronas Towers.");
        historyData.put("mongolia", "Mongolia was once ruled by Genghis Khan, who created the largest empire in history!");
        historyData.put("myanmar", "Myanmar has the Golden Rock, a giant boulder that seems to float on a cliff!");
        historyData.put("nepal", "Nepal is home to Mount Everest, the tallest mountain on Earth!");
        historyData.put("north korea", "North Korea is one of the most secretive countries in the world. Most people don’t have internet or social media!");
        historyData.put("oman", "Oman has a long desert and some of the oldest castles in the world!");
        historyData.put("pakistan", "Pakistan has K2, the second tallest mountain in the world! It’s also home to ancient civilizations!");
        historyData.put("palestine", "Palestine is a place full of history and holy sites, like Bethlehem and Jerusalem.");
        historyData.put("philippines", "The Philippines has over 7,000 islands! It’s also the texting capital of the world!");
        historyData.put("qatar", "Qatar is home to super futuristic buildings and hosted the 2022 FIFA World Cup!");
        historyData.put("saudi arabia", "Saudi Arabia is home to Mecca, the holiest city for Muslims. It’s also full of huge deserts!");
        historyData.put("singapore", "Singapore is a tiny but super modern city! It has gardens with giant glowing trees!");
        historyData.put("south korea", "South Korea is famous for K-Pop, kimchi, and high-tech gadgets!");
        historyData.put("sri lanka", "Sri Lanka is called the Pearl of the Indian Ocean and is home to wild elephants!");
        historyData.put("syria", "Syria has some of the oldest ruins in the world! It was part of the famous Silk Road trade route.");
        historyData.put("taiwan", "Taiwan is known for its yummy night markets, tall mountains, and super cool technology!");
        historyData.put("thailand", "Thailand is known for golden temples, floating markets, and never being colonized!");
        historyData.put("turkey", "The bird 'turkey' is NOT from Turkey! Turkey is where ancient Troy was, and where East meets West!");
        historyData.put("united arab emirates", "The UAE has the tallest building in the world!");
        historyData.put("vietnam", "Vietnam is famous for delicious Pho soup, floating villages, and cool dragon bridges!");
        historyData.put("yemen", "Yemen is home to ancient skyscrapers made of mud! They're over 500 years old and still standing!");
    }

    @GetMapping("/api/countries/{countryName}")
    public String getCountryHistory(@PathVariable String countryName) {
        return historyData.getOrDefault(countryName.toLowerCase(), "No history available for this country.");
    }
}
