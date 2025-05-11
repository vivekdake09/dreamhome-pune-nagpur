
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, BookOpen } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Find Your Dream Home in a Competitive Market",
    excerpt: "Discover key strategies to secure your perfect property even when inventory is low and competition is high.",
    author: "Priya Sharma",
    authorRole: "Real Estate Expert",
    authorAvatar: "/placeholder.svg",
    publishDate: "May 5, 2025",
    readTime: "8 min read",
    category: "Buying Tips",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "5 Home Renovation Projects That Actually Add Value",
    excerpt: "Not all renovations are created equal. Learn which upgrades give you the best return on investment.",
    author: "Rahul Mehta",
    authorRole: "Interior Designer",
    authorAvatar: "/placeholder.svg",
    publishDate: "April 22, 2025",
    readTime: "6 min read",
    category: "Home Improvement",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Understanding Property Taxes in Different Cities",
    excerpt: "A comprehensive guide to how property taxes work and what to expect when buying in various locations.",
    author: "Ananya Patel",
    authorRole: "Financial Advisor",
    authorAvatar: "/placeholder.svg",
    publishDate: "April 10, 2025",
    readTime: "10 min read",
    category: "Finance",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "The Future of Real Estate: Smart Homes and AI",
    excerpt: "Explore how technology is transforming residential properties and what buyers should look for.",
    author: "Vikram Desai",
    authorRole: "Tech Analyst",
    authorAvatar: "/placeholder.svg",
    publishDate: "March 28, 2025",
    readTime: "7 min read",
    category: "Technology",
    image: "/placeholder.svg"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-foreground">Our Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, advice, and news from our real estate experts to help you make informed decisions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="bg-primary/10">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl line-clamp-2 hover:text-primary cursor-pointer">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={post.authorAvatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                  </div>
                  <div className="ml-auto flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>{post.publishDate}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Article
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline" className="mx-1">1</Button>
          <Button className="mx-1">2</Button>
          <Button variant="outline" className="mx-1">3</Button>
          <Button variant="outline" className="ml-2">Next</Button>
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

export default Blog;
