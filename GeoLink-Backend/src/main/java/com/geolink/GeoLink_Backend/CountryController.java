package com.geolink.GeoLink_Backend;

import org.springframework.web.bind.annotation.CrossOrigin;

//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class CountryController {
//
//    @GetMapping("/api/countries/{countryName}")
//    public String getCountryHistory(@PathVariable String countryName) {
//        // Replace with actual data retrieval (could be from a database or static file)
//        if (countryName.equalsIgnoreCase("Japan")) {
//            return "Japan's history includes the Edo period...";
//        }
//        return "No history available for this country.";
//    }
//}


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access API
@RestController
public class CountryController {

    // Example API endpoint to serve country history
    @GetMapping("/api/countries/{countryName}")
    public String getCountryHistory(@PathVariable String countryName) {
        // Example history (can be replaced with database call or external data)
        switch (countryName.toLowerCase()) {
            case "japan":
                return "Japan's history includes the Edo period...";
            case "india":
                return "India's history dates back to the Indus Valley civilization...";
            case "china":
                return "China has a long history, including the Great Wall and the Ming dynasty...";
            default:
                return "No history available for this country.";
        }
    }
}