import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, Edit, Trash, Plus, Search, Hotel, CalendarDays, Users, Clock, Check, DollarSign, Download, Printer, Tag, Percent, Star } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/hooks/auth-context';
import { Navigate } from 'react-router-dom';

// Mock hotel data based on the existing structure in the app
const initialHotels = [
  {
    id: "1",
    name: "Grand Hotel",
    location: "Paris, France",
    price: 180,
    rating: 4.5,
    description: "Luxury hotel in the heart of Paris with stunning views of the Eiffel Tower.",
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ["Featured", "Luxury", "City"],
    amenities: ["Free WiFi", "Restaurant", "Bar", "Spa", "Fitness Center", "Pool"],
    rooms: ["Deluxe Room", "Executive Suite", "Presidential Suite"],
  },
  {
    id: "2",
    name: "Coastal Resort",
    location: "Bali, Indonesia",
    price: 220,
    rating: 4.8,
    description: "Beautiful beachfront resort with private pool villas and stunning ocean views.",
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ["Featured", "Beach", "Resort"],
    amenities: ["Free WiFi", "Restaurant", "Bar", "Spa", "Private Pool", "Beach Access"],
    rooms: ["Garden Villa", "Ocean View Villa", "Beachfront Villa"],
  },
  {
    id: "3",
    name: "City View Hotel",
    location: "New York, USA",
    price: 350,
    rating: 4.2,
    description: "Modern hotel in the heart of Manhattan with easy access to major attractions.",
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ["City", "Business"],
    amenities: ["Free WiFi", "Restaurant", "Bar", "Business Center", "Fitness Center"],
    rooms: ["Standard Room", "Deluxe Suite", "Penthouse"],
  },
];

// Mock reservation data
const initialReservations = [
  {
    id: "1",
    hotelId: "1",
    hotelName: "Grand Hotel",
    guestName: "John Smith",
    email: "john.smith@example.com",
    checkIn: "2023-12-15",
    checkOut: "2023-12-20",
    guests: 2,
    rooms: 1,
    status: "confirmed",
    totalAmount: 900,
  },
  {
    id: "2",
    hotelId: "2",
    hotelName: "Coastal Resort",
    guestName: "Sarah Johnson",
    email: "sarah.j@example.com",
    checkIn: "2024-01-10",
    checkOut: "2024-01-17",
    guests: 4,
    rooms: 2,
    status: "pending",
    totalAmount: 1540,
  },
  {
    id: "3",
    hotelId: "3",
    hotelName: "City View Hotel",
    guestName: "Michael Brown",
    email: "michael.brown@example.com",
    checkIn: "2023-11-25",
    checkOut: "2023-11-28",
    guests: 1,
    rooms: 1,
    status: "completed",
    totalAmount: 1050,
  },
];

// Function to get reservations from localStorage or use initial data
const getReservations = () => {
  try {
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      return JSON.parse(storedReservations);
    }
  } catch (error) {
    console.error('Error retrieving reservations from localStorage', error);
  }
  return initialReservations;
};

// Function to save reservations to localStorage
const saveReservations = (reservations) => {
  try {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  } catch (error) {
    console.error('Error saving reservations to localStorage', error);
  }
};

// Add a function to get promotions from localStorage or use initial data
const getPromotions = () => {
  try {
    const storedPromotions = localStorage.getItem('promotions');
    if (storedPromotions) {
      return JSON.parse(storedPromotions);
    }
  } catch (error) {
    console.error('Error retrieving promotions from localStorage', error);
  }
  return [];
};

// Function to save promotions to localStorage
const savePromotions = (promotions) => {
  try {
    localStorage.setItem('promotions', JSON.stringify(promotions));
  } catch (error) {
    console.error('Error saving promotions to localStorage', error);
  }
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user, isAdmin, isAuthenticated } = useAuth();
  const [hotels, setHotels] = useState(initialHotels);
  const [reservations, setReservations] = useState(getReservations());
  const [promotions, setPromotions] = useState(getPromotions());
  const [activeTab, setActiveTab] = useState("hotels");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddHotelDialogOpen, setIsAddHotelDialogOpen] = useState(false);
  const [isEditHotelDialogOpen, setIsEditHotelDialogOpen] = useState(false);
  const [isAddPromotionDialogOpen, setIsAddPromotionDialogOpen] = useState(false);
  const [isReservationDetailsOpen, setIsReservationDetailsOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    price: 0,
    description: "",
    image: ""
  });
  const [newPromotion, setNewPromotion] = useState({
    id: "",
    name: "",
    description: "",
    discountPercent: 0,
    startDate: "",
    endDate: "",
    hotelIds: [],
    code: "",
    status: "active"
  });
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isEditPromotionDialogOpen, setIsEditPromotionDialogOpen] = useState(false);

  // If not authenticated or not an admin, redirect to admin login
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Listen for new bookings (this is a mock implementation for demo purposes)
    const handleNewBooking = (event) => {
      if (event.key === 'reservations') {
        try {
          const updatedReservations = JSON.parse(event.newValue);
          if (updatedReservations) {
            setReservations(updatedReservations);
          }
        } catch (error) {
          console.error('Error parsing updated reservations', error);
        }
      }
    };

    window.addEventListener('storage', handleNewBooking);

    return () => {
      window.removeEventListener('storage', handleNewBooking);
    };
  }, []);

  // Save reservations to localStorage whenever they change
  useEffect(() => {
    saveReservations(reservations);
  }, [reservations]);

  // Save promotions to localStorage whenever they change
  useEffect(() => {
    savePromotions(promotions);
  }, [promotions]);

  // Filter hotels based on search query
  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter reservations based on search query and status filter
  const filteredReservations = reservations.filter(reservation => {
    // First filter by search query (hotel name, guest name, or email)
    const matchesSearch = 
      reservation.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If status filter is active, also check status match
    if (activeStatusFilter && activeStatusFilter !== 'all') {
      return matchesSearch && reservation.status === activeStatusFilter;
    }
    
    return matchesSearch;
  });

  // Filter promotions based on search query
  const filteredPromotions = promotions.filter(promotion => 
    promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promotion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promotion.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteHotel = (id: string) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
    toast({
      title: "Hotel Deleted",
      description: "The hotel has been successfully removed.",
      variant: "default",
    });
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(reservations.filter(reservation => reservation.id !== id));
    toast({
      title: "Reservation Deleted",
      description: "The reservation has been successfully removed.",
      variant: "default",
    });
  };

  const handleUpdateReservationStatus = (id: string, status: string) => {
    setReservations(reservations.map(reservation => 
      reservation.id === id ? { ...reservation, status } : reservation
    ));
    toast({
      title: "Reservation Updated",
      description: `The reservation status has been updated to ${status}.`,
      variant: "default",
    });
  };

  const handleAddHotel = () => {
    const id = (hotels.length + 1).toString();
    const newHotelEntry = {
      id,
      name: newHotel.name,
      location: newHotel.location,
      price: Number(newHotel.price),
      rating: 5.0,
      description: newHotel.description,
      image: newHotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ["New"],
      amenities: ["Free WiFi"],
      rooms: ["Standard Room"],
    };
    
    setHotels([...hotels, newHotelEntry]);
    setNewHotel({
      name: "",
      location: "",
      price: 0,
      description: "",
      image: ""
    });
    setIsAddHotelDialogOpen(false);
    
    toast({
      title: "Hotel Added",
      description: "The new hotel has been added successfully.",
      variant: "default",
    });
  };

  const handleViewReservation = (reservation) => {
    setSelectedReservation(reservation);
    setIsReservationDetailsOpen(true);
  };

  const getReservationStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleEditHotel = (id) => {
    const hotel = hotels.find(hotel => hotel.id === id);
    if (hotel) {
      setSelectedHotel({...hotel});
      setIsEditHotelDialogOpen(true);
    }
  };

  const handleSaveHotelEdit = () => {
    setHotels(hotels.map(hotel => 
      hotel.id === selectedHotel.id ? selectedHotel : hotel
    ));
    
    toast({
      title: "Hotel Updated",
      description: "The hotel information has been updated successfully.",
      variant: "default",
    });
    
    setIsEditHotelDialogOpen(false);
  };

  const handleAddPromotion = () => {
    const id = Date.now().toString();
    const newPromotionEntry = {
      ...newPromotion,
      id,
      status: "active",
      code: newPromotion.code || `PROMO${Math.floor(Math.random() * 10000)}`
    };
    
    setPromotions([...promotions, newPromotionEntry]);
    setNewPromotion({
      id: "",
      name: "",
      description: "",
      discountPercent: 0,
      startDate: "",
      endDate: "",
      hotelIds: [],
      code: "",
      status: "active"
    });
    setIsAddPromotionDialogOpen(false);
    
    toast({
      title: "Promotion Added",
      description: "The new promotion has been added successfully.",
      variant: "default",
    });
  };

  const handleDeletePromotion = (id) => {
    setPromotions(promotions.filter(promotion => promotion.id !== id));
    toast({
      title: "Promotion Deleted",
      description: "The promotion has been successfully removed.",
      variant: "default",
    });
  };

  const handleUpdatePromotionStatus = (id, status) => {
    setPromotions(promotions.map(promotion => 
      promotion.id === id ? { ...promotion, status } : promotion
    ));
    toast({
      title: "Promotion Updated",
      description: `The promotion status has been updated to ${status}.`,
      variant: "default",
    });
  };

  const handleEditPromotion = (id) => {
    const promotion = promotions.find(promo => promo.id === id);
    if (promotion) {
      setSelectedPromotion({...promotion});
      setIsEditPromotionDialogOpen(true);
    }
  };

  const handleSavePromotionEdit = () => {
    setPromotions(promotions.map(promotion => 
      promotion.id === selectedPromotion.id ? selectedPromotion : promotion
    ));
    
    toast({
      title: "Promotion Updated",
      description: "The promotion information has been updated successfully.",
      variant: "default",
    });
    
    setIsEditPromotionDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-10 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground">
                  <span>Welcome,</span>
                  <span className="font-semibold">{user?.name || 'Administrator'}</span>
                </div>
                
                {activeTab === "hotels" && (
                  <Dialog open={isAddHotelDialogOpen} onOpenChange={setIsAddHotelDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Hotel
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Hotel</DialogTitle>
                        <DialogDescription>
                          Enter the details for the new hotel.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Hotel Name</Label>
                          <Input
                            id="name"
                            value={newHotel.name}
                            onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                            placeholder="Enter hotel name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={newHotel.location}
                            onChange={(e) => setNewHotel({...newHotel, location: e.target.value})}
                            placeholder="City, Country"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price per Night</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newHotel.price}
                            onChange={(e) => setNewHotel({...newHotel, price: Number(e.target.value)})}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            value={newHotel.description}
                            onChange={(e) => setNewHotel({...newHotel, description: e.target.value})}
                            placeholder="Brief description of the hotel"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            value={newHotel.image}
                            onChange={(e) => setNewHotel({...newHotel, image: e.target.value})}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddHotelDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddHotel}>Add Hotel</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                
                {activeTab === "promotions" && (
                  <Dialog open={isAddPromotionDialogOpen} onOpenChange={setIsAddPromotionDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Promotion
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Add New Promotion</DialogTitle>
                        <DialogDescription>
                          Enter the details for the new promotion.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Promotion Name</Label>
                          <Input
                            id="name"
                            value={newPromotion.name}
                            onChange={(e) => setNewPromotion({...newPromotion, name: e.target.value})}
                            placeholder="Enter promotion name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            value={newPromotion.description}
                            onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                            placeholder="Brief description of the promotion"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discountPercent">Discount Percent</Label>
                          <Input
                            id="discountPercent"
                            type="number"
                            value={newPromotion.discountPercent}
                            onChange={(e) => setNewPromotion({...newPromotion, discountPercent: Number(e.target.value)})}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={newPromotion.startDate}
                            onChange={(e) => setNewPromotion({...newPromotion, startDate: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={newPromotion.endDate}
                            onChange={(e) => setNewPromotion({...newPromotion, endDate: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hotelIds">Hotels</Label>
                          <Select
                            value="all"
                            onValueChange={(val) => {
                              if (val === "all") {
                                setNewPromotion({...newPromotion, hotelIds: hotels.map(h => h.id)});
                              } else {
                                setNewPromotion({...newPromotion, hotelIds: [val]});
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select hotels" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Hotels</SelectItem>
                              {hotels.map((hotel) => (
                                <SelectItem key={hotel.id} value={hotel.id}>
                                  {hotel.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="code">Promotion Code</Label>
                          <Input
                            id="code"
                            value={newPromotion.code}
                            onChange={(e) => setNewPromotion({...newPromotion, code: e.target.value})}
                            placeholder="Enter promotion code"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddPromotionDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddPromotion}>Add Promotion</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="hotels" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="hotels" className="flex items-center">
                <Hotel className="mr-2 h-4 w-4" />
                Hotels
              </TabsTrigger>
              <TabsTrigger value="reservations" className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                Reservations
              </TabsTrigger>
              <TabsTrigger value="promotions" className="flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                Promotions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="hotels">
              <Card>
                <CardHeader>
                  <CardTitle>Hotels Management</CardTitle>
                  <CardDescription>
                    Manage hotel listings, edit details, and remove hotels from the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHotels.map((hotel) => (
                        <TableRow key={hotel.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <img 
                                src={hotel.image} 
                                alt={hotel.name} 
                                className="w-10 h-10 object-cover rounded-md mr-3" 
                              />
                              {hotel.name}
                            </div>
                          </TableCell>
                          <TableCell>{hotel.location}</TableCell>
                          <TableCell>${hotel.price}</TableCell>
                          <TableCell>{hotel.rating}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleEditHotel(hotel.id)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteHotel(hotel.id)}>
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reservations">
              <div className="grid gap-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-muted-foreground text-sm">Total Reservations</span>
                          <span className="text-2xl font-bold">{reservations.length}</span>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-full">
                          <CalendarDays className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-muted-foreground text-sm">Pending</span>
                          <span className="text-2xl font-bold">
                            {reservations.filter(r => r.status === 'pending').length}
                          </span>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-muted-foreground text-sm">Confirmed</span>
                          <span className="text-2xl font-bold">
                            {reservations.filter(r => r.status === 'confirmed').length}
                          </span>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                          <Check className="h-6 w-6 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-muted-foreground text-sm">Total Revenue</span>
                          <span className="text-2xl font-bold">
                            ${reservations.reduce((sum, r) => sum + r.totalAmount, 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                          <DollarSign className="h-6 w-6 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Recent Reservations</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage and track all guest bookings in one place
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={activeStatusFilter} onValueChange={(val) => {
                      setActiveStatusFilter(val);
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reservations</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {(searchQuery || activeStatusFilter !== 'all') && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveStatusFilter('all');
                        }}
                      >
                        Reset Filters
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm" onClick={() => {
                      // Export reservations to CSV (example function)
                      const csv = reservations.map(r => 
                        `${r.id},${r.hotelName},${r.guestName},${r.email},${r.checkIn},${r.checkOut},${r.status},${r.totalAmount}`
                      ).join('\n');
                      const blob = new Blob([csv], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'reservations.csv';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      toast({
                        title: "Export Complete",
                        description: "Reservations have been exported to CSV",
                      });
                    }}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Reservations Management</CardTitle>
                  <CardDescription>
                    Track and manage guest reservations and booking status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hotel</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Check In/Out</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReservations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No reservations found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredReservations.map((reservation) => (
                          <TableRow 
                            key={reservation.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleViewReservation(reservation)}
                          >
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={hotels.find(h => h.id === reservation.hotelId)?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                                  alt={reservation.hotelName} 
                                  className="w-12 h-12 rounded-md object-cover" 
                                />
                                <div>
                                  <div className="font-medium">{reservation.hotelName}</div>
                                  <div className="text-sm text-muted-foreground">
                                    ID: {reservation.id.substring(0, 8)}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{reservation.guestName}</div>
                                <div className="text-sm text-muted-foreground">{reservation.email}</div>
                                {reservation.phone && (
                                  <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm space-y-1">
                                <div className="flex items-center">
                                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded mr-2">IN</span>
                                  {reservation.checkIn}
                                </div>
                                <div className="flex items-center">
                                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded mr-2">OUT</span>
                                  {reservation.checkOut}
                                </div>
                                <div className="text-muted-foreground flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}, 
                                  <Hotel className="h-3 w-3 ml-1" />
                                  {reservation.rooms} {reservation.rooms === 1 ? 'room' : 'rooms'}
                                </div>
                                {reservation.roomType && (
                                  <div className="text-xs text-muted-foreground italic">
                                    {reservation.roomType}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  reservation.status === "confirmed" ? "default" : 
                                  reservation.status === "pending" ? "outline" : 
                                  "secondary"
                                }
                                className="capitalize"
                              >
                                {reservation.status}
                              </Badge>
                              {reservation.specialRequests && (
                                <div className="mt-2">
                                  <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-400">
                                    Special requests
                                  </Badge>
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">${reservation.totalAmount.toFixed(2)}</div>
                              <div className="text-xs text-muted-foreground">
                                {reservation.paymentStatus ? reservation.paymentStatus : 'Awaiting payment'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewReservation(reservation);
                                  }}>
                                    View Details
                                  </DropdownMenuItem>
                                  
                                  <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                      <DropdownMenuItem onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateReservationStatus(reservation.id, "pending");
                                      }}>
                                        <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                                        Pending
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateReservationStatus(reservation.id, "confirmed");
                                      }}>
                                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                        Confirmed
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateReservationStatus(reservation.id, "completed");
                                      }}>
                                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                                        Completed
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateReservationStatus(reservation.id, "cancelled");
                                      }}>
                                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                                        Cancelled
                                      </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                  </DropdownMenuSub>
                                  
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteReservation(reservation.id);
                                  }} className="text-red-600 focus:text-red-600">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="promotions">
              <Card>
                <CardHeader>
                  <CardTitle>Promotions Management</CardTitle>
                  <CardDescription>
                    Manage and create promotions for hotels.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Discount Percent</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPromotions.map((promotion) => (
                        <TableRow key={promotion.id}>
                          <TableCell className="font-medium">{promotion.name}</TableCell>
                          <TableCell>{promotion.description}</TableCell>
                          <TableCell>{promotion.discountPercent}%</TableCell>
                          <TableCell>{promotion.startDate}</TableCell>
                          <TableCell>{promotion.endDate}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                promotion.status === "active" ? "default" : 
                                "secondary"
                              }
                              className="capitalize"
                            >
                              {promotion.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditPromotion(promotion.id);
                                }}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePromotion(promotion.id);
                                }} className="text-red-600 focus:text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Reservation Details Dialog */}
      <Dialog open={isReservationDetailsOpen} onOpenChange={setIsReservationDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedReservation && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-xl">Reservation Details</DialogTitle>
                  <div className={`px-3 py-1 rounded-full text-white text-sm ${getReservationStatusColor(selectedReservation.status)}`}>
                    {selectedReservation.status.charAt(0).toUpperCase() + selectedReservation.status.slice(1)}
                  </div>
                </div>
                <DialogDescription>
                  Reservation ID: <span className="font-medium">{selectedReservation.id}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                {/* Hotel Information */}
                <div className="space-y-4">
                  <div className="font-medium text-sm text-muted-foreground">Hotel Information</div>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={hotels.find(h => h.id === selectedReservation.hotelId)?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                      alt={selectedReservation.hotelName} 
                      className="w-20 h-20 rounded-md object-cover" 
                    />
                    <div>
                      <div className="font-bold text-lg">{selectedReservation.hotelName}</div>
                      <div className="text-muted-foreground">
                        {hotels.find(h => h.id === selectedReservation.hotelId)?.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 border rounded-md p-3 bg-muted/20">
                    <div>
                      <div className="text-sm font-medium">Room Type</div>
                      <div>{selectedReservation.roomType || 'Standard Room'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Number of Rooms</div>
                      <div>{selectedReservation.rooms} room(s)</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Guests</div>
                      <div>{selectedReservation.guests} guest(s)</div>
                    </div>
                  </div>
                </div>
                
                {/* Guest Information */}
                <div className="space-y-4">
                  <div className="font-medium text-sm text-muted-foreground">Guest Information</div>
                  <div className="grid gap-2">
                    <div>
                      <div className="text-sm font-medium">Guest Name</div>
                      <div>{selectedReservation.guestName}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div>{selectedReservation.email}</div>
                    </div>
                    {selectedReservation.phone && (
                      <div>
                        <div className="text-sm font-medium">Phone</div>
                        <div>{selectedReservation.phone}</div>
                      </div>
                    )}
                    {selectedReservation.userId && (
                      <div>
                        <div className="text-sm font-medium">User Account</div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                            Registered User
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedReservation.specialRequests && (
                    <div className="border rounded-md p-3 bg-yellow-50 border-yellow-200">
                      <div className="text-sm font-medium text-yellow-800">Special Requests</div>
                      <div className="text-yellow-700 mt-1">{selectedReservation.specialRequests}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dates */}
                <div className="space-y-4">
                  <div className="font-medium text-sm text-muted-foreground">Reservation Dates</div>
                  <div className="border rounded-md divide-y">
                    <div className="flex justify-between p-3">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Check In</span>
                      </div>
                      <div className="font-medium">{selectedReservation.checkIn}</div>
                    </div>
                    <div className="flex justify-between p-3">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Check Out</span>
                      </div>
                      <div className="font-medium">{selectedReservation.checkOut}</div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="space-y-4">
                  <div className="font-medium text-sm text-muted-foreground">Payment Information</div>
                  <div className="border rounded-md divide-y">
                    <div className="flex justify-between p-3">
                      <span>Subtotal</span>
                      <span>${(selectedReservation.totalAmount / 1.15).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span>Taxes (15%)</span>
                      <span>${(selectedReservation.totalAmount - selectedReservation.totalAmount / 1.15).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-3 font-bold">
                      <span>Total</span>
                      <span>${selectedReservation.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center border-t pt-4 mt-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Label htmlFor="status-update" className="whitespace-nowrap">
                      Update Status:
                    </Label>
                    <Select 
                      value={selectedReservation.status} 
                      onValueChange={(value) => handleUpdateReservationStatus(selectedReservation.id, value)}
                    >
                      <SelectTrigger className="w-[180px]" id="status-update">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                            Pending
                          </span>
                        </SelectItem>
                        <SelectItem value="confirmed">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Confirmed
                          </span>
                        </SelectItem>
                        <SelectItem value="completed">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                            Completed
                          </span>
                        </SelectItem>
                        <SelectItem value="cancelled">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Cancelled
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      handleDeleteReservation(selectedReservation.id);
                      setIsReservationDetailsOpen(false);
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Reservation
                  </Button>
                </div>
                
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Details
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Hotel Dialog */}
      <Dialog open={isEditHotelDialogOpen} onOpenChange={setIsEditHotelDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedHotel && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Hotel</DialogTitle>
                <DialogDescription>
                  Update the hotel information, rooms, pricing, and features.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Hotel Name</Label>
                    <Input
                      id="name"
                      value={selectedHotel.name}
                      onChange={(e) => setSelectedHotel({...selectedHotel, name: e.target.value})}
                      placeholder="Enter hotel name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={selectedHotel.location}
                      onChange={(e) => setSelectedHotel({...selectedHotel, location: e.target.value})}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Base Price per Night ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={selectedHotel.price}
                      onChange={(e) => setSelectedHotel({...selectedHotel, price: Number(e.target.value)})}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={selectedHotel.rating}
                      onChange={(e) => setSelectedHotel({...selectedHotel, rating: Number(e.target.value)})}
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={selectedHotel.description}
                    onChange={(e) => setSelectedHotel({...selectedHotel, description: e.target.value})}
                    placeholder="Brief description of the hotel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={selectedHotel.image}
                    onChange={(e) => setSelectedHotel({...selectedHotel, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Tags Section */}
                <div className="space-y-2 border rounded-md p-4">
                  <Label className="text-base font-medium">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Featured", "Luxury", "Budget", "Business", "Beach", "City", "Resort", "Family"].map(tag => (
                      <Badge 
                        key={tag}
                        variant={selectedHotel.tags?.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const currentTags = [...(selectedHotel.tags || [])];
                          if (currentTags.includes(tag)) {
                            setSelectedHotel({
                              ...selectedHotel, 
                              tags: currentTags.filter(t => t !== tag)
                            });
                          } else {
                            setSelectedHotel({
                              ...selectedHotel, 
                              tags: [...currentTags, tag]
                            });
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Click tags to toggle them on/off. Featured hotels appear on the home page.
                  </div>
                </div>

                {/* Amenities Section */}
                <div className="space-y-2 border rounded-md p-4">
                  <Label className="text-base font-medium">Amenities</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Free WiFi", "Restaurant", "Bar", "Spa", "Pool", "Fitness Center", "Business Center", "Parking", "Beach Access", "Pet-friendly", "Airport Shuttle"].map(amenity => (
                      <Badge 
                        key={amenity}
                        variant={selectedHotel.amenities?.includes(amenity) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const currentAmenities = [...(selectedHotel.amenities || [])];
                          if (currentAmenities.includes(amenity)) {
                            setSelectedHotel({
                              ...selectedHotel, 
                              amenities: currentAmenities.filter(a => a !== amenity)
                            });
                          } else {
                            setSelectedHotel({
                              ...selectedHotel, 
                              amenities: [...currentAmenities, amenity]
                            });
                          }
                        }}
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Room Types Section */}
                <div className="space-y-4 border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Room Types</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentRooms = [...(selectedHotel.rooms || [])];
                        setSelectedHotel({
                          ...selectedHotel,
                          rooms: [...currentRooms, "New Room Type"]
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Room
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {selectedHotel.rooms?.map((room, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={room}
                          onChange={(e) => {
                            const updatedRooms = [...selectedHotel.rooms];
                            updatedRooms[index] = e.target.value;
                            setSelectedHotel({
                              ...selectedHotel,
                              rooms: updatedRooms
                            });
                          }}
                          placeholder="Room type name"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updatedRooms = selectedHotel.rooms.filter((_, i) => i !== index);
                            setSelectedHotel({
                              ...selectedHotel,
                              rooms: updatedRooms
                            });
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {(!selectedHotel.rooms || selectedHotel.rooms.length === 0) && (
                      <div className="text-center text-muted-foreground py-2">
                        No room types added yet. Click "Add Room" to create one.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditHotelDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveHotelEdit}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Promotion Dialog */}
      <Dialog open={isEditPromotionDialogOpen} onOpenChange={setIsEditPromotionDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPromotion && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Promotion</DialogTitle>
                <DialogDescription>
                  Update the promotion information.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Promotion Name</Label>
                  <Input
                    id="name"
                    value={selectedPromotion.name}
                    onChange={(e) => setSelectedPromotion({...selectedPromotion, name: e.target.value})}
                    placeholder="Enter promotion name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={selectedPromotion.description}
                    onChange={(e) => setSelectedPromotion({...selectedPromotion, description: e.target.value})}
                    placeholder="Enter promotion description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPercent">Discount Percent</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    value={selectedPromotion.discountPercent}
                    onChange={(e) => setSelectedPromotion({...selectedPromotion, discountPercent: Number(e.target.value)})}
                    placeholder="Enter discount percent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={selectedPromotion.startDate}
                    onChange={(e) => setSelectedPromotion({...selectedPromotion, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={selectedPromotion.endDate}
                    onChange={(e) => setSelectedPromotion({...selectedPromotion, endDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hotelIds">Hotels</Label>
                  <Select
                    value={
                      selectedPromotion.hotelIds.length === hotels.length ? 
                        "all" : 
                        (selectedPromotion.hotelIds.length > 0 ? selectedPromotion.hotelIds[0] : "all")
                    }
                    onValueChange={(val) => {
                      if (val === "all") {
                        setSelectedPromotion({
                          ...selectedPromotion,
                          hotelIds: hotels.map(h => h.id)
                        });
                      } else {
                        setSelectedPromotion({
                          ...selectedPromotion,
                          hotelIds: [val]
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hotels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Hotels</SelectItem>
                      {hotels.map((hotel) => (
                        <SelectItem key={hotel.id} value={hotel.id}>
                          {hotel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Promotion Code</Label>
                  <Input
                    id="code"
                    value={selectedPromotion.code}
                    onChange={(e) => setSelectedPromotion({...selectedPromotion, code: e.target.value})}
                    placeholder="Enter promotion code"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={selectedPromotion.status}
                    onValueChange={(value) => {
                      setSelectedPromotion({
                        ...selectedPromotion,
                        status: value
                      });
                    }}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        <span className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Active
                        </span>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <span className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                          Inactive
                        </span>
                      </SelectItem>
                      <SelectItem value="expired">
                        <span className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                          Expired
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditPromotionDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSavePromotionEdit}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard; 