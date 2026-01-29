export const translations = {
    en: {
        // Hero Section
        heroTitle1: "Find Your",
        heroTitle2: "Dream Property",
        heroDescription: "KamProperty helps you find the perfect home, apartment, or office space. Browse thousands of properties for sale or rent across the country.",
        getStarted: "Get Started",
        signIn: "Sign In",
        
        // Team Section
        ourTeam: "Our Team Project",
        teammate1: "David Yon",
        role1: "Full Stack Developer",
        desc1: "Lead developer and project architect",
        teammate2: "Agent Sothea",
        role2: "Property Specialist",
        desc2: "Expert in real estate and client relations",
        teammate3: "User Chhangleang",
        role3: "UX/UI Designer",
        desc3: "Creates beautiful and user-friendly interfaces",
        
        // Features Section
        featuresTitle: "Everything you need for your property journey",
        featuresSubtitle: "From browsing to closing, we've got you covered.",
        feature1Title: "Wide Selection",
        feature1Desc: "Thousands of properties across all categories",
        feature2Title: "Verified Listings",
        feature2Desc: "All properties are thoroughly verified",
        feature3Title: "Expert Agents",
        feature3Desc: "Professional guidance every step of the way",
        feature4Title: "Secure Payments",
        feature4Desc: "Safe and secure transaction process",
        
        // CTA Section
        ctaTitle: "Ready to find your perfect property?",
        ctaDescription: "Join thousands of satisfied customers who found their dream home through KamProperty.",
        signUpFree: "Sign up for free"
    },
    kh: {
        // Hero Section
        heroTitle1: "ស្វែងរក",
        heroTitle2: "អចលនទ្រព្យសុបិន្តរបស់អ្នក",
        heroDescription: "KamProperty ជួយអ្នកស្វែងរកផ្ទះ ផ្ទះជុំ ឬកន្លែងការងារដ៏ល្អឥតខ្ចោះ។ រកមើលអចលនទ្រព្យរាប់ពាន់សម្រាប់លក់ ឬជួលនៅទូទាំងប្រទេស។",
        getStarted: "ចាប់ផ្តើម",
        signIn: "ចូល",
        
        // Team Section
        ourTeam: "គម្រោងក្រុមការងាររបស់យើង",
        teammate1: "ដេវីដ យន",
        role1: "អ្នកអភិវឌ្ឍ Full Stack",
        desc1: "អ្នកអភិវឌ្ឍន៍ដឹកនាំ និងស្ថាបត្យករគម្រោង",
        teammate2: "ភ្នាក់ងារ សុធា",
        role2: "អ្នកឯកទេសអចលនទ្រព្យ",
        desc2: "ជំនាញក្នុងអចលនទ្រព្យ និងទំនាក់ទំនងអតិថិជន",
        teammate3: "អ្នកប្រើប្រាស់ ចង្លាងលាង",
        role3: "អ្នករចនា UX/UI",
        desc3: "បង្កើតចំណុចប្រទាក់ដ៏ស្អាត និងងាយស្រួលប្រើ",
        
        // Features Section
        featuresTitle: "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការសម្រាប់ដំណើរអចលនទ្រព្យរបស់អ្នក",
        featuresSubtitle: "ចាប់ពីការរុករករហូតដល់ការបញ្ចប់ យើងមានអ្នកគ្របដណ្តប់។",
        feature1Title: "ជម្រើសធំទូលាយ",
        feature1Desc: "អចលនទ្រព្យរាប់ពាន់នៅទូទាំងប្រភេទទាំងអស់",
        feature2Title: "បញ្ជីដែលបានផ្ទៀងផ្ទាត់",
        feature2Desc: "អចលនទ្រព្យទាំងអស់ត្រូវបានផ្ទៀងផ្ទាត់យ៉ាងហ្មត់ចត់",
        feature3Title: "ភ្នាក់ងារជំនាញ",
        feature3Desc: "ការណែនាំអាជីពរាល់ជំហាននៃផ្លូវ",
        feature4Title: "ការទូទាត់សុវត្ថិភាព",
        feature4Desc: "ដំណើរការទូទាត់មានសុវត្ថិភាព និងសុវត្ថិភាព",
        
        // CTA Section
        ctaTitle: "ត្រៀមខ្លួនរកអចលនទ្រព្យដ៏ល្អឥតខ្ចោះរបស់អ្នកហើយឬនៅ?",
        ctaDescription: "ចូលរួមជាមួយអតិថិជនរាប់ពាន់នាក់ដែលបានរកឃើញផ្ទះសុបិន្តរបស់ពួកគេតាមរយៈ KamProperty។",
        signUpFree: "ចុះឈ្មោះដោយឥតគិតថ្លៃ"
    }
};

export const useTranslation = (lang) => {
    return translations[lang] || translations.en;
};