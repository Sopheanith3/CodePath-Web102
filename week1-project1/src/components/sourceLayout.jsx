import React from "react";
import Card from "./cardLayout";

const sourceLayout = () => {
    return (
        <div className="Container">
            <Card 
            imageURL="./src/image/AngkorWat.jpg"
            name="Angkor Wat"
            description="Angkor Wat, located in Siem Reap, Cambodia, is the largest 
            religious monument in the world and a masterpiece of Khmer architecture."
            link="https://en.wikipedia.org/wiki/Angkor_Wat"
            />

            <Card
            imageURL="./src/image/Bayorn.jpg"
            name="Bayon Temple"
            description="Bayon Temple, is a remarkable temple built 
            in the late 12th to early 13th century by King Jayavarman VII. "
            link="https://en.wikipedia.org/wiki/Bayon"
            />

            <Card
            imageURL="./src/image/Banteay Srei.jpg"
            name="Banteay Srei"
            description="Banteay Srei, located near Angkor in Cambodia, is a small yet highly detailed 
            temple built in the 10th century and dedicated to the Hindu god Shiva."
            link="https://en.wikipedia.org/wiki/Banteay_Srei"
            />

            <Card
            imageURL="./src/image/Bakheng.jpg"
            name="Phnom Bakheng"
            description="Phnom Bakheng is a Hindu and Buddhist
            temple located on a hilltop in the Angkor Archaeological Park near Siem Reap, Cambodia."
            link="https://en.wikipedia.org/wiki/Phnom_Bakheng"
            />

            <Card
            imageURL="./src/image/PreahKhan.jpg"
            name="Prasat Preah Khan"
            description="Prasat Preah Khan is a historic temple located in the Angkor Archaeological Park near Siem Reap, Cambodia. Built in the late 12th century by King Jayavarman VII,
            it was originally constructed as a Buddhist monastery and university. "
            link="https://en.wikipedia.org/wiki/Preah_Khan"
            />

            <Card
            imageURL="./src/image/Primeanakas.jpg"
            name="Primeanakas Temple"
            description="Primeanakas Temple is a HIndu temple in the Khleang style, built at the end of the
            10th century, during the reign of Rajendravarman, then completed by Suryavarman I in the shape
            of a three tier pyramid as a Hindu temple."
            link="https://en.wikipedia.org/wiki/Phimeanakas"
            />

            <Card
            imageURL="./src/image/SamreTemple.jpg"
            name="Banteay Samre Temple"
            description="Banteay Samre is a charming temple, and it was built in the early 12th century during the 
            reign of King Suryavarman II, this temple showcases the classical Angkorian 
            architecture of the Khmer Empire, with intricate carvings and beautifully 
            preserved structures. "
            link="https://en.wikipedia.org/wiki/Banteay_Samr%C3%A9"
            />

            <Card
            imageURL="./src/image/Thommanon.jpg"
            name="Thommanon Temple"
            description="Thommanon Temple is a small yet charming Hindu temple and it was built
            during the early 12th century under King Suryavarman II, it is dedicated to Shiva and Vishnu, 
            showcasing beautiful carvings and well-preserved sandstone structures. "
            link="https://en.wikipedia.org/wiki/Thommanon"
            />


            <Card
            imageURL="./src/image/Phnom Kraom.jpg"
            name="Phnom Kraom Temple"
            description="Phnom Kraom is is an ancient hilltop temple it was built in the late 9th to early 
            10th century during the reign of King Yasovarman I, the temple 
            is dedicated to the Hindu trinity of Shiva, Vishnu, and Brahma."
            link="https://en.wikipedia.org/wiki/Phnom_Krom"
            />

            <Card
            imageURL="./src/image/Chamkrong.jpg"
            name="Baksei Chamkrong Temple"
            description="TBaksei Chamkrong is a small Buddhist Temple located in the Angkor complex. 
            It is dedicated to Buddha and used to hold a golden image of him. 
            The temple can be seen on the left side when entering Angkor Thom at the southern gate. 
            It was dedicated to Yasovarman by his son, King Harshavarman I. "
            link="https://en.wikipedia.org/wiki/Prasat_Baksei_Chamkrong"
            />



        </div>
    )
}

export default sourceLayout;