# College OLX — Campus Marketplace for Students

A modern peer-to-peer campus marketplace designed specifically for college students to buy and sell textbooks, bicycles, calculators, room furniture, and gadgets within their own university campus.

---

## 🌟 Key Features

1. **Campus-Specific Filtering**:
   - Filter items exclusively by college (e.g. *IIT Delhi*, *BITS Pilani*, *DU North Campus*, *VIT Vellore*, *IIT Bombay*, *MIT Manipal*, etc.).
   - Switch between colleges instantly or explore all campuses across the country.

2. **Categorized Product Feed**:
   - Books & Notes (GATE/JEE/semester textbooks)
   - Bicycles & Vehicles (hostel campus cycles, helmets)
   - Electronics & Gadgets (scientific calculators, Arduino kits, laptops)
   - Hostel & Furniture (study tables, chairs, kettles, bed tables)
   - Lab Gear & Uniforms (lab coats, drafters, stethoscopes)
   - Sports & Fitness (badminton rackets, gym weights)

3. **Student-to-Student Direct Connect**:
   - One-click **WhatsApp Chat** with pre-filled message mentioning product title and campus.
   - **Call Seller** button.
   - Campus safety checklist (encouraging deals in public spots like Central Library or SAC).

4. **Post an Ad**:
   - Quick ad listing form with campus selector, hostel pickup point, price, condition (Brand New / Like New / Good / Fair), negotiable pricing flag, and photo presets or custom image URLs.
   - Persists automatically to local storage and syncs with Supabase if configured.

---

## 🚀 Running the Project

In the project folder:
```bash
cd C:\Users\jashan\.gemini\antigravity\scratch\college-olx
```

### Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build:
```bash
npm run build
npm start
```

---

## 🗄️ Supabase PostgreSQL Setup (Optional)

The application works completely out of the box with realistic mock campus data and client persistence. To connect your live Supabase database:

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Run the SQL script from `supabase-schema.sql` in Supabase's SQL Editor.
3. Create a `.env.local` file with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
