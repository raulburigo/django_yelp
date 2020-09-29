from django.shortcuts import render
import os


def home_view(request):
    return render(request, 'index.html', {'dataset': {
        'page': 'home',
        'id': os.environ['TESTE']
    }})


def detail_view(request, id):
    return render(request, 'index.html', {'dataset': {
        'page': 'detail',
        'id': id
    }})


def update_view(request, id):
    return render(request, 'index.html', {'dataset': {
        'page': 'update',
        'id': id
    }})
