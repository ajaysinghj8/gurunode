class A
   attr_accessor :name
   attr_accessor :no

   def initialize a 
   	@name = "Ajay"
   	@no = 10
    @@a=a
   end 
   def show
    puts "in parent class"
   end
end

class B < A
  def initialize a,b
  	super a
  	@@b=b
  end

   def show
    A.show
    puts @@a
    puts @@b
   end
end


obj = B.new 5,10
obj.show