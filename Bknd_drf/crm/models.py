from django.db import models
from django.utils import timezone
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
 
class Manager(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True) 
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        related_name='managers'
    )
    team = models.CharField(max_length=100, blank=True, null=True)
    status = models.BooleanField(default=False)  

    def __str__(self):
        return self.name
    



class Staff(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    skills = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True) 
    manager = models.ForeignKey(
        'Manager',
        on_delete=models.SET_NULL,
        null=True,
        blank=False,
        related_name='staff_members'
    )

    def __str__(self):
        return self.name



class Customer(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )

    STATUS_CHOICES = (
        ('New', 'New'),
        ('In Progress', 'In Progress'),
        ('Converted', 'Converted'),
    )

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=False)
    date_of_birth = models.DateField(blank=True, null=True)
    picture = models.ImageField(upload_to='customers/', blank=True, null=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name