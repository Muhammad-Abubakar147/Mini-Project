Student={}

#Interface of App

while True:
    print("\n---------  ( STDENTS MANAGER APP )---------")
    print("1. Add student..")
    print("2. View student..")
    print("3. Check result..")
    print("4. Exit..")
    
    
    #Enter chioce here
    
    choice= input("Enter your Choice :")
    
    #for Addeding student
    
    if choice=="1":
        name=input("Enter Student Name :")
        Marks=int(input("Enter marks :"))
        Student[name]=Marks
        
        print(f"{name} Successfully Added !")
        
    #View Student
    
    elif choice=="2":
        if not Student:
            print("No Student Found !")   
        else:
            for name,Marks in Student.items():
                print(name,":",Marks)
    #Check RESULT
    
    elif choice=="3":
        name = input("Enter student name :")    
        
        if name in Student:
            marks=Student[name]
            if marks >=40:
                print("PASS")
            else:
                print("FAIL")
        
        else:
            print("Student not found")
    
    elif choice=="4":
        print("EXITING ....")
        break
    
    else:
        print("INVALID CHOICE")