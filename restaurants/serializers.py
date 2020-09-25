from rest_framework import serializers
from .models import Restaurant, Review
from django.db.models import Avg


class RestaurantListSerializer(serializers.ModelSerializer):
    avg_rating = serializers.SerializerMethodField(read_only=True)
    count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            'id',
            'name',
            'location',
            'price_range',
            'avg_rating',
            'count'
        ]

    def get_count(self, obj):
        return Review.objects.filter(restaurant=obj).count()

    def get_avg_rating(self, obj):
        queryset = Review.objects.filter(restaurant=obj)
        return queryset.aggregate(Avg('rating'))['rating__avg']


class ReviewSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Review
        fields = [
            'id',
            'restaurant',
            'name',
            'review',
            'rating',
        ]

    def get_name(self, obj):
        # return obj.user.first_name
        return obj.user.username


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'restaurant',
            'user',
            'review',
            'rating',
        ]

    def get_name(self, obj):
        # return obj.user.first_name
        return obj.user.username


class SpecificRestaurantSerializer(serializers.ModelSerializer):
    avg_rating = serializers.SerializerMethodField(read_only=True)
    count = serializers.SerializerMethodField(read_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            'id',
            'name',
            'location',
            'price_range',
            'avg_rating',
            'reviews',
            'count',
        ]

    def get_count(self, obj):
        return obj.review_set.all().count()

    def get_avg_rating(self, obj):
        queryset = obj.review_set.all()
        return queryset.aggregate(Avg('rating'))['rating__avg']

    def get_reviews(self, obj):
        return ReviewSerializer(obj.review_set.all(), many=True).data
