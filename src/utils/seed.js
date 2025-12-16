import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase";
import { MOCK_ZONES } from "../data/mockZones";

export const seedZones = async () => {
    const batch = writeBatch(db);

    MOCK_ZONES.forEach((zone) => {
        const docRef = doc(collection(db, "areas")); // Use auto-ID or specific ID
        batch.set(docRef, {
            ...zone,
            createdAt: new Date()
        });
    });

    try {
        await batch.commit();
        console.log("Zones seeded successfully!");
        alert("Zones seeded to Firestore!");
    } catch (error) {
        console.error("Error seeding zones:", error);
        alert("Error seeding zones (check console)");
    }
};
