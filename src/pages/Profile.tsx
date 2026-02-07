import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, MapPin, Package, ArrowLeft, Mail, Lock, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Profile = () => {
  const { user, login, logout, isLoggedIn } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [showOrders, setShowOrders] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      // Simulate Login
      if (email && password) {
        login({ name: "John Doe", email });
        toast.success("Welcome back!");
      } else {
        toast.error("Please fill in all fields");
      }
    } else {
      // Simulate Signup
      if (name && email && password) {
        login({ name, email });
        toast.success("Account created successfully!");
      } else {
        toast.error("Please fill in all fields");
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {isLoginView ? "Log In" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLoginView
                ? "Welcome back! Please enter your details."
                : "Join us today! Enter your details below."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLoginView && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="name"
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full size-lg">
                {isLoginView ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {isLoginView ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => setIsLoginView(!isLoginView)}
                className="font-semibold text-primary hover:underline"
              >
                {isLoginView ? "Sign up" : "Log in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showOrders) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2" 
          onClick={() => setShowOrders(false)}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Manage your recent orders and returns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Order #{1000 + order}</p>
                      <p className="text-sm text-muted-foreground">Placed on March {10 + order}, 2024</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto">
                    <p className="font-bold text-lg">₹{(Math.random() * 5000 + 500).toFixed(2)}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                      Delivered
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* User Info Card */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{user?.name}</CardTitle>
            <CardDescription>Member since 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>New York, USA</span>
            </div>
            
            <div className="pt-4 space-y-3">
              <Button className="w-full" variant="outline">
                Edit Profile
              </Button>
              <Button 
                className="w-full" 
                variant="destructive"
                onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Options */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4">
            <div 
              className="p-6 border rounded-xl hover:bg-muted/50 cursor-pointer transition-all flex items-center justify-between group"
              onClick={() => setShowOrders(true)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Your Orders</h3>
                  <p className="text-muted-foreground">Track, return, or buy things again</p>
                </div>
              </div>
              <div className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>

            {/* Add more menu items here if needed */}
            <div className="p-6 border rounded-xl hover:bg-muted/50 cursor-pointer transition-all flex items-center justify-between group opacity-60">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Login & Security</h3>
                  <p className="text-muted-foreground">Edit login, name, and mobile number</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
