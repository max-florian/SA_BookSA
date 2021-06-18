from fabric2 import task, Connection

def compose_up(host, user, key):
    c = Connection(host=host, user=user, connect_kwargs=key)
    c.put("./docker-compose.prod.yaml", "docker-compose.yaml")
    c.run("docker-compose pull")
    c.run("docker-compose up -d")
    c.close()

@task
def deploy(ctx):
    connect_kwargs = {
        "key_filename": ["/home/alexizzarevalo/.ssh/jenkins"]
    }
    compose_up("34.67.7.63", "alexizzarevalo", connect_kwargs)
