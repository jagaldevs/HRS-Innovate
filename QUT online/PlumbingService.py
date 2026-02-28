#task 1
border =  "=" * 50
print(border)
print("The best Cheap Same Day Service")
print("Written by Jack Galbraith N11778709")
print(border)

#taks 2
#rate is $60 per hour but minimum charge is $90 (this is dumb)
hours = float(input("Enter the number of hours required for this servivce: "))

total_charge = hours * 60
if total_charge < 90:
    total_charge = 90

#i can calculate average later on no variable needed
sum = 0.0 #total horus worked
count = 0 #number of jobs done
longest = 0.0 #longest job in hours

#loop to get hours for 6 different jobs task 5
for i in range(6):
    duration = float(input("Enter the duration of job: "))
    if duration > 1.5:
        sum = sum + duration
        count = count + 1
        if duration > longest:
            longest = duration

print("Charges for this job is:")
if count > 0:
    average = sum / count
    print(f"Sum = {sum}")
    print(f"Count = {count}")
    print(f"Longest = {longest}")
    print(f"Average = {average}")
else:
    print("No jobs greater than 1.5 hours.")