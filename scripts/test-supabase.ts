import { supabase } from "../lib/supabase";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function testConnection() {
    console.log("Testing Supabase connection...");

    try {
        // Test connection by attempting to query the database
        const { data, error } = await supabase.from('_').select('*').limit(1);

        if (error) {
            // If we get an error about the table not existing, that's actually good - it means we connected
            if (error.message.includes('does not exist') || error.message.includes('relation')) {
                console.log("✅ Connection successful! (Table doesn't exist, but connection works)");
                console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
            } else {
                console.error("❌ Connection error:", error.message);
            }
        } else {
            console.log("✅ Connection successful!");
            console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
        }
    } catch (error) {
        console.error("❌ Error connecting to Supabase:", error);
    }
}

testConnection();
