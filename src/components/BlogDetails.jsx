// BlogDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

// Blog Data
const blogPosts = [
  {
    id: "1",
    title: "Top 10 Skincare Tips for Glowing Skin",
    image: "/skincare.avif",
    content: `
Glowing skin is achievable with the right daily routine and products. Here are our top 10 tips:  

1. **Cleanse twice daily** – removes dirt and excess oil.  
2. **Exfoliate gently 2-3 times a week** – removes dead skin cells.  
3. **Always apply sunscreen** – protects from UV damage.  
4. **Stay hydrated** – water is key for radiant skin.  
5. **Use serums with active ingredients like Vitamin C** – boosts skin health.  
6. **Moisturize according to your skin type** – keeps your skin balanced.  
7. **Get enough sleep** – repair happens while you rest.  
8. **Maintain a healthy diet** – nutrients reflect on your skin.  
9. **Avoid touching your face frequently** – reduces breakouts.  
10. **Regularly visit a professional** – facials and skin checkups.  

Following these tips will ensure your skin stays radiant and healthy all year round.
    `,
  },
  {
    id: "2",
    title: "Trending Haircuts & Hairstyles for 2025",
    image: "/haircare.avif",
    content: `
Hairstyles for 2025 focus on versatility and natural texture.  

1. **Layered cuts** – soft and flowing look.  
2. **Blunt bob cuts** – edgy and trendy.  
3. **Men’s styles** – textured crops and undercuts.  
4. **Highlights & balayage** – adds depth and dimension.  

Consult your stylist to find a haircut that complements your face shape and lifestyle.
    `,
  },
  {
    id: "3",
    title: "Essential Grooming Tips for Men & Women",
    image: "/about2.avif",
    content: `
Maintaining a polished appearance is essential for confidence.  

1. **Hair** – trim regularly and use quality shampoos.  
2. **Skin** – follow a consistent skincare routine.  
3. **Nails** – keep them clean and trimmed.  
4. **Makeup** – apply lightly for natural looks.  

Consistency and proper care will help you look confident and well-groomed every day.
    `,
  },
  {
    id: "4",
    title: "DIY Beauty Treatments You Can Safely Try",
    image: "/makeover.avif",
    content: `
Pamper yourself at home with these safe DIY beauty treatments:  

1. **Honey and sugar scrubs** – for exfoliation.  
2. **Avocado masks** – for hydration.  
3. **Aloe vera gel** – soothes skin.  
4. **Coconut oil treatments** – nourishes hair.  

Always patch test new treatments and consult professionals for serious concerns.
    `,
  },
  {
    id: "5",
    title: "Trending Nail Art Designs for Every Occasion",
    image: "/nail1.avif",
    content: `
Nail art is an expression of personal style. Popular designs include:  

1. **Minimalist geometric patterns**  
2. **Floral and seasonal designs**  
3. **Glitter and metallic accents**  
4. **Ombré color transitions**  

Pair your nail art with outfits for events or casual days to enhance your overall look.
    `,
  },
  {
    id: "6",
    title: "Medicure And Pedicure: Benefits & Care Tips",
    image: "/medi.avif",
    content: `
Regular medicure and pedicure treatments maintain nail health and prevent infections.  

1. **Clean nails thoroughly** and moisturize cuticles.  
2. **Choose professional salons** with hygienic practices.  
3. **Regular treatments** improve circulation and skin texture.  
4. **Avoid harsh chemicals** for sensitive skin.  

Investing in nail care ensures healthy and beautiful hands and feet.
    `,
  },
  {
    id: "7",
    title: "Seasonal Skincare Routines You Should Follow",
    image: "/skincare.avif",
    content: `
Adapting your skincare routine to the season is crucial.  

1. **Summer** – Use lightweight moisturizers and high SPF sunscreen.  
2. **Winter** – Hydrate with heavier creams and avoid hot showers.  
3. **Spring/Fall** – Gentle exfoliation and transition products.  

Seasonal adjustments keep your skin balanced and glowing all year.
    `,
  },
  {
    id: "8",
    title: "Hair Care Myths Debunked by Professionals",
    image: "/haircare.avif",
    content: `
Many hair care myths circulate online. Here’s what professionals say:  

1. **Myth:** Frequent haircuts make hair grow faster ❌  
2. **Myth:** Brushing 100 times a day is good ❌  
3. **Myth:** Natural oils can replace shampoo entirely ❌  

Trust your stylist and use scientifically-backed hair care methods for best results.
    `,
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogPosts.find((b) => b.id === id);

  if (!blog)
    return (
      <p className="text-center mt-20 text-xl text-red-500 font-semibold">
        Oops! Blog not found.
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Back Button */}
      <Link
        to="/blogs"
        className="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
      >
        &larr; Back to Blogs
      </Link>

      {/* Blog Title */}
      <h1 className="text-5xl font-extrabold mb-8 leading-tight text-gray-900">
        {blog.title}
      </h1>

      {/* Blog Image */}
      <motion.img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-xl shadow-lg mb-8"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Blog Content */}
      <div className="prose prose-indigo max-w-none text-gray-700 whitespace-pre-line">
        {blog.content.split("\n").map((line, idx) => {
          if (!line.trim()) return <br key={idx} />;

          // Headings
          if (line.startsWith("# ")) return <h1 key={idx}>{line.replace("# ", "")}</h1>;
          if (line.startsWith("## ")) return <h2 key={idx}>{line.replace("## ", "")}</h2>;
          if (line.startsWith("### ")) return <h3 key={idx}>{line.replace("### ", "")}</h3>;

          // List Items
          if (/^\d+\./.test(line)) return <p key={idx} className="ml-6 list-decimal">{line}</p>;

          return <p key={idx}>{line}</p>;
        })}
      </div>

      {/* Author / Date */}
      <div className="mt-12 text-sm text-gray-400 italic">
        Posted on: {new Date().toLocaleDateString()} | By Admin
      </div>
    </motion.div>
  );
}
