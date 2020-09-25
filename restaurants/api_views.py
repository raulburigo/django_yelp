from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Restaurant
from .serializers import (
    RestaurantListSerializer,
    SpecificRestaurantSerializer,
    CreateReviewSerializer
)


class Base(APIView):
    def get(self, request, format=None):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantListSerializer(restaurants, many=True)
        return Response({
            "status": "success",
            "results": 2,
            "data": {
                "restaurants": serializer.data
            }
        }, status=200)

    def post(self, request, format=None):
        new_restaurant = request.data
        serializer = RestaurantListSerializer(data=new_restaurant)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": "success",
                "data": {
                    "restaurant": serializer.data
                }
            }, status=201)
        return Response(serializer.errors, status=400)


class Specific(APIView):
    def get(self, request, id, format=None):
        restaurant = Restaurant.objects.filter(id=id).first()
        if restaurant is None:
            return Response({'status': 'failed'}, status=404)
        serializer = SpecificRestaurantSerializer(instance=restaurant)
        return Response({
            "status": "success",
            "data": {
                "restaurant": serializer.data
            }
        }, status=200)

    def delete(self, request, id, format=None):
        restaurant = Restaurant.objects.filter(id=id).first()
        if restaurant is None:
            return Response({'status': 'failed'}, status=404)
        restaurant.delete()
        return Response(None, status=200)

    def put(self, request, id, format=None):
        restaurant = Restaurant.objects.filter(id=id).first()
        if restaurant is None:
            return Response({'status': 'failed'}, status=404)
        new_data = {
            **RestaurantListSerializer(restaurant).data,
            'name': request.data['name'],
            'location': request.data['location'],
            'price_range': request.data['price_range']
        }
        serializer = RestaurantListSerializer(
            instance=restaurant,
            data=new_data
        )
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": "success",
                "data": {
                    "restaurant": serializer.data
                }
            }, status=200)
        return Response(serializer.errors, status=400)


class Review(APIView):
    def post(self, request, id, format=None):
        restaurant = Restaurant.objects.filter(id=id).first()
        if restaurant is None:
            return Response({'status': 'failed'}, status=404)
        new_review = {**request.data, 'restaurant': id}
        alt_data = {
            **request.data,
            'restaurant': id,
            'user': request.user
        }
        print(alt_data)
        serializer = CreateReviewSerializer(data=new_review)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": "success",
                "data": serializer.data
            }, status=201)
        return Response(serializer.errors, status=400)
