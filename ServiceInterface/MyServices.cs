using ServiceStack;
using quiz.ServiceModel;

namespace quiz.ServiceInterface
{
    public class MyServices : Service
    {
        public object Any(Hello request) => 
            new HelloResponse { Result = $"Hello, {request.Name}!" };
    }
}