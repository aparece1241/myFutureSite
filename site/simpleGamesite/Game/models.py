from django.db import models

# Create your models here.


# testing
class Game(models.Model):
    name = models.CharField(max_length=100,default=None)
    image = models.ImageField(upload_to="images",default="default.png")
    description = models.TextField(default=None,null=True)
    slug = models.SlugField(max_length=100,default=None)

    def __str__(self):
        return self.name


