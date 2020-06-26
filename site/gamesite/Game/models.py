from django.db import models

# Create your models here.

class Game(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date_published = models.DateField(auto_now_add=True)
    game_images = models.ImageField(default='default.png',upload_to='media')
    slug = models.SlugField(max_length=200)
    # game file
    # author = 
    # category = models.CharField(choices=)
    def __str__ (self):
        return self.name
