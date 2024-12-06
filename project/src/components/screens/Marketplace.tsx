import React from 'react';

function Marketplace() {
  const items = [
    {
      id: 1,
      title: 'Professional Camera',
      price: '$999',
      image: 'https://picsum.photos/seed/item1/400/300',
      seller: 'John Doe'
    },
    {
      id: 2,
      title: 'Vintage Watch',
      price: '$299',
      image: 'https://picsum.photos/seed/item2/400/300',
      seller: 'Jane Smith'
    },
    {
      id: 3,
      title: 'Gaming Laptop',
      price: '$1499',
      image: 'https://picsum.photos/seed/item3/400/300',
      seller: 'Mike Johnson'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Marketplace</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          List Item
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-[#1e2128] rounded-xl overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-lg">{item.title}</h3>
              <p className="text-blue-500 font-bold mt-1">{item.price}</p>
              <div className="flex items-center mt-2">
                <img 
                  src={`https://ui-avatars.com/api/?name=${item.seller.replace(' ', '+')}`} 
                  alt={item.seller} 
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-400 ml-2">{item.seller}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;