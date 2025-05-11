
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, ArrowLeft, Share2, BookmarkPlus } from 'lucide-react';

// Mock blog post data - this would typically come from an API
const blogPosts = [
  {
    id: "1",
    title: "How to Find Your Dream Home in a Competitive Market",
    excerpt: "Discover key strategies to secure your perfect property even when inventory is low and competition is high.",
    content: `
      <p class="text-lg mb-4">In today's competitive real estate market, finding your dream home can feel like an impossible task. With low inventory and high demand, properties are selling faster than ever, often with multiple offers above asking price.</p>
      
      <p class="mb-4">But don't lose hope! With the right strategies and preparation, you can still find and secure the perfect home for you and your family. Here are our top tips for navigating a competitive housing market:</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">1. Get pre-approved, not just pre-qualified</h2>
      <p class="mb-4">A pre-approval letter is much stronger than a pre-qualification and shows sellers that you're serious and capable of completing the purchase. This gives you a significant advantage over buyers who haven't taken this step.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">2. Work with an experienced local agent</h2>
      <p class="mb-4">A knowledgeable local real estate agent will have insider information about properties coming to market and can sometimes help you see homes before they're officially listed. Their negotiation skills are also invaluable in competitive situations.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">3. Be ready to act quickly</h2>
      <p class="mb-4">When you find a home you love, be prepared to make an offer immediately. This means having your finances in order, your down payment ready, and your schedule flexible for viewings and inspections.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">4. Consider offering favorable terms beyond price</h2>
      <p class="mb-4">While price is important, sellers also value certainty and convenience. Consider offering a flexible closing date, waiving contingencies (with caution), or even writing a personal letter explaining why you love their home.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">5. Look beyond the obvious listings</h2>
      <p class="mb-4">Expand your search to include up-and-coming neighborhoods, fixer-uppers with potential, or homes that have been on the market longer than average. Sometimes the perfect home is one that others have overlooked.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">6. Don't get discouraged</h2>
      <p class="mb-4">Finding your dream home in a competitive market might take longer than expected, and you might face rejection along the way. Stay positive and persistent—the right home will eventually come along.</p>
      
      <p class="mt-6">Remember, even in the most competitive markets, people successfully buy homes every day. With preparation, persistence, and the right professional support, your dream home is within reach.</p>
    `,
    author: "Priya Sharma",
    authorRole: "Real Estate Expert",
    authorAvatar: "/placeholder.svg",
    publishDate: "May 5, 2025",
    readTime: "8 min read",
    category: "Buying Tips",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "5 Home Renovation Projects That Actually Add Value",
    excerpt: "Not all renovations are created equal. Learn which upgrades give you the best return on investment.",
    content: `
      <p class="text-lg mb-4">When it comes to home renovations, not all projects are created equal in terms of return on investment. Some renovations might bring you personal joy but won't necessarily increase your home's value when it's time to sell.</p>
      
      <p class="mb-4">If you're looking to maximize your return when renovating, focus on these five projects that consistently add value to homes:</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">1. Kitchen Updates</h2>
      <p class="mb-4">The kitchen remains the heart of the home and a major selling point. You don't need a complete gut renovation to see returns. Sometimes, simply updating cabinet fronts, adding a fresh coat of paint, installing new hardware, and upgrading to energy-efficient appliances can transform the space at a fraction of the cost.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">2. Bathroom Refreshes</h2>
      <p class="mb-4">Like kitchens, bathrooms are high-priority spaces for buyers. Replacing outdated fixtures, reglazing a tub instead of replacing it, updating lighting, and adding fresh caulk and grout can make a bathroom look new without breaking the bank.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">3. Energy-Efficient Improvements</h2>
      <p class="mb-4">With rising energy costs and growing environmental awareness, energy-efficient upgrades are increasingly valuable. Consider adding insulation, replacing old windows, installing a smart thermostat, or upgrading to energy-efficient appliances. These improvements save money long-term and appeal to environmentally conscious buyers.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">4. Curb Appeal Enhancements</h2>
      <p class="mb-4">First impressions matter. Simple landscaping improvements, a fresh coat of exterior paint, updating the front door, and adding outdoor lighting can dramatically increase your home's appeal. These projects tend to be relatively inexpensive but offer excellent returns.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">5. Creating Usable Space</h2>
      <p class="mb-4">Converting underutilized spaces into functional areas adds immediate value. Consider finishing a basement, converting an attic into a bedroom, or building a deck or patio to extend living space outdoors. Added square footage of usable space almost always translates to higher resale value.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">Renovations to Approach with Caution</h2>
      <p class="mb-4">While the above projects typically yield good returns, some renovations rarely pay for themselves:</p>
      <ul class="list-disc ml-6 mb-4">
        <li>Swimming pools (maintenance costs and limited appeal in many markets)</li>
        <li>Luxury upgrades that are out of sync with neighborhood standards</li>
        <li>Highly personalized renovations (like themed rooms)</li>
        <li>Removing bedrooms to create larger spaces (bedroom count matters)</li>
      </ul>
      
      <p class="mt-6">Before undertaking any renovation project, research what buyers in your specific area value most. Local real estate trends can significantly impact which renovations will give you the best return on your investment.</p>
    `,
    author: "Rahul Mehta",
    authorRole: "Interior Designer",
    authorAvatar: "/placeholder.svg",
    publishDate: "April 22, 2025",
    readTime: "6 min read",
    category: "Home Improvement",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Understanding Property Taxes in Different Cities",
    excerpt: "A comprehensive guide to how property taxes work and what to expect when buying in various locations.",
    content: `
      <p class="text-lg mb-4">Property taxes are an essential consideration when purchasing real estate, yet many buyers overlook this ongoing expense when budgeting for their dream home. These taxes vary dramatically between different cities and can significantly impact your long-term housing costs.</p>
      
      <p class="mb-4">This guide helps demystify property taxes and explains why they differ so much from one location to another.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">How Property Taxes Work</h2>
      <p class="mb-4">Property taxes are levied by local governments to fund public services like schools, roads, emergency services, and other community needs. Generally, property taxes are calculated using this formula:</p>
      
      <p class="bg-muted p-3 rounded mb-4 text-center"><strong>Property Tax = Assessed Property Value × Tax Rate</strong></p>
      
      <p class="mb-4">However, the way property values are assessed and the tax rates applied can vary significantly between jurisdictions.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">Why Tax Rates Differ Between Cities</h2>
      <p class="mb-4">Several factors influence property tax rates in different cities:</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">1. Local Government Funding Needs</h3>
      <p class="mb-4">Cities with more extensive public services (better schools, more parks, etc.) often have higher property taxes to fund these amenities.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">2. Property Values</h3>
      <p class="mb-4">Areas with high property values may have lower tax rates because they can generate sufficient revenue even with a lower percentage. Conversely, areas with lower property values might need higher rates to fund local services.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">3. Other Revenue Sources</h3>
      <p class="mb-4">Some cities have diverse revenue streams (sales taxes, tourism taxes, etc.) and rely less on property taxes, while others depend heavily on property taxes to fund local government.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">Property Tax Comparison in Major Cities</h2>
      <p class="mb-4">Here's how property taxes compare in some major Indian cities (effective rates):</p>
      
      <ul class="list-disc ml-6 mb-4">
        <li><strong>Mumbai:</strong> 0.5% - 1% of capital value</li>
        <li><strong>Delhi:</strong> 6% - 12% of rateable value</li>
        <li><strong>Bangalore:</strong> 0.2% - 0.5% of capital value</li>
        <li><strong>Chennai:</strong> 0.5% - 1% of annual rental value</li>
        <li><strong>Pune:</strong> 0.4% - 0.8% of capital value</li>
      </ul>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">Property Tax Exemptions and Reductions</h2>
      <p class="mb-4">Many jurisdictions offer property tax breaks for certain homeowners:</p>
      
      <ul class="list-disc ml-6 mb-4">
        <li>Senior citizen discounts</li>
        <li>Disability exemptions</li>
        <li>Veterans benefits</li>
        <li>Homestead exemptions for primary residences</li>
        <li>Green building incentives for eco-friendly homes</li>
      </ul>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">How to Budget for Property Taxes</h2>
      <p class="mb-4">When shopping for a home, consider these strategies:</p>
      
      <ul class="list-disc ml-6 mb-4">
        <li>Research the property tax history for any home you're considering</li>
        <li>Ask about recent reassessments or planned rate changes</li>
        <li>Budget for potential increases (typically 1-3% annually)</li>
        <li>Consider setting up an escrow account where your lender collects monthly amounts for taxes</li>
      </ul>
      
      <p class="mt-6">Understanding property taxes in different cities can help you make a more informed decision when purchasing real estate. Remember that while a location might have higher property taxes, the services those taxes fund might make the area more desirable and help maintain property values over time.</p>
    `,
    author: "Ananya Patel",
    authorRole: "Financial Advisor",
    authorAvatar: "/placeholder.svg",
    publishDate: "April 10, 2025",
    readTime: "10 min read",
    category: "Finance",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    title: "The Future of Real Estate: Smart Homes and AI",
    excerpt: "Explore how technology is transforming residential properties and what buyers should look for.",
    content: `
      <p class="text-lg mb-4">The real estate landscape is undergoing a profound transformation as smart home technology and artificial intelligence become increasingly integrated into residential properties. These innovations are not just changing how we interact with our homes but are also reshaping buyer expectations and property valuations.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">The Rise of Smart Home Technology</h2>
      <p class="mb-4">Smart home technology has evolved far beyond novelty gadgets to become integrated systems that enhance security, comfort, and efficiency. Today's smart homes typically feature:</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">1. Integrated Security Systems</h3>
      <p class="mb-4">Modern security systems now include smart locks, video doorbells, motion sensors, and surveillance cameras that homeowners can monitor and control remotely. These systems can also detect unusual activities and send real-time alerts to homeowners' smartphones.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">2. Energy Management</h3>
      <p class="mb-4">Smart thermostats, lighting, and appliances can learn homeowners' habits and automatically adjust settings to optimize energy usage. These systems can reduce energy bills by 10-30% while providing greater comfort and convenience.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">3. Voice-Controlled Home Assistants</h3>
      <p class="mb-4">Voice assistants like Amazon's Alexa, Google Assistant, and Apple's HomeKit have become central control hubs for smart homes, allowing residents to control various systems through simple voice commands.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">AI's Growing Role in Real Estate</h2>
      <p class="mb-4">Artificial intelligence is transforming real estate in several key ways:</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">1. Predictive Maintenance</h3>
      <p class="mb-4">AI systems can monitor home systems (HVAC, plumbing, electrical) and predict potential failures before they occur, enabling preventive maintenance that saves homeowners from costly emergency repairs.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">2. Personalized Living Experiences</h3>
      <p class="mb-4">AI can learn residents' preferences and automatically adjust lighting, temperature, music, and other environmental factors to create personalized living experiences that change throughout the day.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">3. Enhanced Property Management</h3>
      <p class="mb-4">For multi-unit buildings, AI systems can optimize resource allocation, manage maintenance requests, and even handle tenant communications, reducing management costs while improving service.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">What Buyers Should Look For</h2>
      <p class="mb-4">As these technologies become more mainstream, buyers should consider several factors when evaluating smart homes:</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">1. Compatibility and Interoperability</h3>
      <p class="mb-4">Look for homes with systems that work well together and support major standards (like Matter or Zigbee) to avoid being locked into proprietary ecosystems.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">2. Upgradeability</h3>
      <p class="mb-4">Technology evolves rapidly. Homes with easily upgradeable systems will remain current longer and require less renovation to keep up with technological advances.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">3. Infrastructure Readiness</h3>
      <p class="mb-4">Check for robust electrical systems, high-speed internet connectivity, and adequate wireless coverage throughout the property. These foundational elements are crucial for supporting smart home technology.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">4. Privacy and Security Features</h3>
      <p class="mb-4">Evaluate what security measures are in place to protect smart systems from hacking and to safeguard personal data.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">The Future is Already Here</h2>
      <p class="mb-4">Looking ahead, we can expect even more advanced integration of AI and smart technology in homes:</p>
      
      <ul class="list-disc ml-6 mb-4">
        <li>Health monitoring systems that can detect medical emergencies</li>
        <li>Advanced robotics for cleaning, maintenance, and assistance</li>
        <li>Augmented reality interfaces for controlling home systems</li>
        <li>Sustainable energy management with solar integration and smart grid interaction</li>
      </ul>
      
      <p class="mt-6">For today's homebuyers, understanding these technological trends isn't just about enjoying the latest conveniences—it's about making sound investments in properties that will hold their value and appeal in an increasingly tech-centered real estate market.</p>
    `,
    author: "Vikram Desai",
    authorRole: "Tech Analyst",
    authorAvatar: "/placeholder.svg",
    publishDate: "March 28, 2025",
    readTime: "7 min read",
    category: "Technology",
    image: "/placeholder.svg"
  }
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Back to blog link */}
        <Link to="/blog" className="inline-flex items-center text-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to blog</span>
        </Link>
        
        {/* Article header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Badge variant="outline" className="bg-primary/10 mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.authorAvatar} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium leading-none">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="max-w-4xl mx-auto mb-12">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
        
        {/* Article content */}
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Social sharing */}
          <div className="border-t border-border mt-12 pt-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                More Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 by BookMyDreamHome Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
