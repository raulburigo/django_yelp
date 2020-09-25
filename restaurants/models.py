from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User


class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    price_range = models.IntegerField(validators=[
        MaxValueValidator(5),
        MinValueValidator(1)
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('name', 'location')

    def __str__(self):
        return f"{self.name}, {self.location}"


class Review(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.IntegerField(validators=[
        MaxValueValidator(5),
        MinValueValidator(1)
    ])

    class Meta:
        unique_together = ('user', 'restaurant')

    def __str__(self):
        return f"{self.user!r} - {self.restaurant!r}"
