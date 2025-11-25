
export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "ElectricChargeHub has completely transformed how I plan my trips. I never worry about finding a charging station anymore.",
      author: "Abhishek Kandera",
      role: "Full Stack Developer",
      image: "",
    },
    {
      id: 2,
      quote: "As someone who travels frequently for work, this app has been a game-changer. Booking charging slots in advance gives me peace of mind.",
      author: "Shashank Tyagi",
      role: "API Engineer",
      image: "",
    },
    {
      id: 3,
      quote: "The real-time availability feature is incredible. I've saved countless hours that I would have spent driving to unavailable stations.",
      author: "Sunny Kumar",
      role: "Full Stack Developer",
      image: "https://github.com/Prokandera/chage-up-ev/blob/main/public/IMG_20251010_113146_340.webp",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-ev-blue">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Loved by EV drivers
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg ring-1 ring-gray-200 hover-lift animate-slide-in-bottom"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <blockquote className="text-gray-700">
                  <p className="text-lg">"{testimonial.quote}"</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-ev-blue to-ev-green p-0.5 ring-2 ring-gray-200">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
