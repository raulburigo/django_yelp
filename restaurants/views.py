from django.shortcuts import render


def home_view(request):
    return render(request, 'react_index.html', {'dataset': {
        'page': 'home',
        'id': None
    }})


def detail_view(request, id):
    return render(request, 'react_index.html', {'dataset': {
        'page': 'detail',
        'id': id
    }})


def update_view(request, id):
    return render(request, 'react_index.html', {'dataset': {
        'page': 'update',
        'id': id
    }})
