import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Payment = () => {
  const navigate = useNavigate();
  const { cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleProceed = () => {
    if (paymentMethod === 'upi' && !upiId.trim()) {
      toast.error('Please enter your UPI ID');
      return;
    }
    
    toast.success('Payment successful! Order placed.');
    clearCart();
    navigate('/products');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Payment</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
            
            <div className="grid gap-4">
              <button
                onClick={() => {
                  setPaymentMethod('upi');
                  setShowQR(false);
                }}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="h-8 w-8 text-foreground" />
                  <div className="text-left">
                    <div className="font-semibold">UPI Payment</div>
                    <div className="text-sm text-muted-foreground">Pay using UPI ID</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setPaymentMethod('qr');
                  setShowQR(true);
                }}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'qr' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="h-8 w-8 text-foreground" />
                  <div className="text-left">
                    <div className="font-semibold">QR Code</div>
                    <div className="text-sm text-muted-foreground">Scan to pay</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setPaymentMethod('card');
                  setShowQR(false);
                }}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-foreground" />
                  <div className="text-left">
                    <div className="font-semibold">Card Payment</div>
                    <div className="text-sm text-muted-foreground">Credit or Debit Card</div>
                  </div>
                </div>
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="upiId">Enter UPI ID</Label>
                  <Input
                    id="upiId"
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleProceed} className="w-full" size="lg">
                  Pay Now
                </Button>
              </div>
            )}

            {paymentMethod === 'qr' && (
              <div className="space-y-4 mt-6">
                <div className="flex flex-col items-center justify-center p-8 bg-secondary rounded-lg">
                  <div className="w-64 h-64 bg-white rounded-lg p-4 mb-4 flex items-center justify-center border-2 border-dashed border-foreground/20">
                    <QrCode className="h-48 w-48 text-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Scan this QR code with your UPI app to complete payment
                  </p>
                  <div className="mt-4 text-2xl font-bold text-primary">
                    ₹{cartTotal.toFixed(2)}
                  </div>
                </div>
                <Button onClick={handleProceed} className="w-full" size="lg">
                  I've Paid
                </Button>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                    id="cvv"
                    type="text"
                    className="mt-2"
                  />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    type="text"
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleProceed} className="w-full" size="lg">
                  Pay Now
                </Button>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;

