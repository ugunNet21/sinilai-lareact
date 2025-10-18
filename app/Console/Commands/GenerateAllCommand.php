<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputArgument;

class GenerateAllCommand extends Command
{
    protected $signature = 'make:all {name} 
                            {--model} 
                            {--migration} 
                            {--controller} 
                            {--repository} 
                            {--service} 
                            {--livewire} 
                            {--request} 
                            {--seed} 
                            {--factory}
                            {--inertia-react}
                            {--inertia-vue}';

    protected $description = 'Generate multiple Laravel components at once with optional subfolder and Inertia support';

    public function handle()
    {
        $name = $this->argument('name');
        $pathInfo = $this->parseNameAndPath($name);
        $modelName = $pathInfo['modelName'];
        $subFolder = $pathInfo['subFolder'];
        $fullPath = $pathInfo['fullPath'];

        // Generate Model
        if ($this->option('model')) {
            $this->call('make:model', [
                'name' => $fullPath,
                '--migration' => $this->option('migration'),
                '--factory' => $this->option('factory'),
                '--seed' => $this->option('seed'),
            ]);
        }

        // Generate Controller
        if ($this->option('controller')) {
            $controllerPath = $subFolder ? "{$subFolder}/{$modelName}Controller" : "{$modelName}Controller";
            
            // Check if Inertia is requested
            $isInertia = $this->option('inertia-react') || $this->option('inertia-vue');
            
            if ($isInertia) {
                $this->createInertiaController($modelName, $subFolder);
            } else {
                $this->call('make:controller', [
                    'name' => $controllerPath,
                    '--model' => $fullPath,
                    '--api' => false,
                ]);
            }
        }

        // Generate Repository
        if ($this->option('repository')) {
            $this->createRepository($modelName, $subFolder);
        }

        // Generate Service
        if ($this->option('service')) {
            $this->createService($modelName, $subFolder);
        }

        // Generate Livewire Component
        if ($this->option('livewire')) {
            $livewirePath = $subFolder ? "{$subFolder}/{$modelName}Table" : "{$modelName}Table";
            $this->call('make:livewire', [
                'name' => $livewirePath,
            ]);
        }

        // Generate Form Request
        if ($this->option('request')) {
            $requestPath = $subFolder ? "{$subFolder}/{$modelName}Request" : "{$modelName}Request";
            $this->call('make:request', [
                'name' => $requestPath,
            ]);
        }

        // Generate Inertia React Components
        if ($this->option('inertia-react')) {
            $this->createInertiaReactComponents($modelName, $subFolder);
        }

        // Generate Inertia Vue Components
        if ($this->option('inertia-vue')) {
            $this->createInertiaVueComponents($modelName, $subFolder);
        }

        $this->info("All components for {$modelName} generated successfully in {$subFolder}!");
    }

    protected function parseNameAndPath($name)
    {
        $parts = explode('/', $name);
        $modelName = Str::studly(array_pop($parts));
        $subFolder = !empty($parts) ? implode('/', $parts) : null;
        $fullPath = $subFolder ? "{$subFolder}/{$modelName}" : $modelName;

        return [
            'modelName' => $modelName,
            'subFolder' => $subFolder,
            'fullPath' => $fullPath,
        ];
    }

    protected function createRepository($modelName, $subFolder = null)
    {
        $repoNamespace = $subFolder ? "App\\Repositories\\{$subFolder}" : "App\\Repositories";
        $interfaceNamespace = $subFolder ? "App\\Repositories\\Contracts\\{$subFolder}" : "App\\Repositories\\Contracts";
        
        $repoDirectory = $subFolder ? app_path("Repositories/{$subFolder}") : app_path('Repositories');
        $interfaceDirectory = $subFolder ? app_path("Repositories/Contracts/{$subFolder}") : app_path('Repositories/Contracts');

        if (!file_exists($repoDirectory)) {
            mkdir($repoDirectory, 0755, true);
        }

        if (!file_exists($interfaceDirectory)) {
            mkdir($interfaceDirectory, 0755, true);
        }

        $repoPath = "{$repoDirectory}/{$modelName}Repository.php";
        $repoInterfacePath = "{$interfaceDirectory}/{$modelName}RepositoryInterface.php";

        $interfaceStub = $this->getStub('RepositoryInterface');
        $interfaceContent = str_replace(
            ['{{model}}', '{{namespace}}'],
            [$modelName, $interfaceNamespace],
            $interfaceStub
        );
        file_put_contents($repoInterfacePath, $interfaceContent);

        $repoStub = $this->getStub('Repository');
        $repoContent = str_replace(
            ['{{model}}', '{{namespace}}', '{{interfaceNamespace}}'],
            [$modelName, $repoNamespace, $interfaceNamespace],
            $repoStub
        );
        file_put_contents($repoPath, $repoContent);

        $this->info("Repository and Interface for {$modelName} created successfully.");
    }

    protected function createService($modelName, $subFolder = null)
    {
        $namespace = $subFolder ? "App\\Services\\{$subFolder}" : "App\\Services";
        $interfaceNamespace = $subFolder ? "App\\Repositories\\Contracts\\{$subFolder}" : "App\\Repositories\\Contracts";
        
        $serviceDirectory = $subFolder ? app_path("Services/{$subFolder}") : app_path('Services');
    
        if (!file_exists($serviceDirectory)) {
            mkdir($serviceDirectory, 0755, true);
        }
    
        $servicePath = "{$serviceDirectory}/{$modelName}Service.php";
    
        $serviceStub = $this->getStub('Service');
        $serviceContent = str_replace(
            ['{{model}}', '{{namespace}}', '{{interfaceNamespace}}'],
            [$modelName, $namespace, $interfaceNamespace],
            $serviceStub
        );
        file_put_contents($servicePath, $serviceContent);
    
        $this->info("Service for {$modelName} created successfully.");
    }

    protected function createInertiaController($modelName, $subFolder = null)
    {
        $namespace = $subFolder ? "App\\Http\\Controllers\\{$subFolder}" : "App\\Http\\Controllers";
        $serviceNamespace = $subFolder ? "App\\Services\\{$subFolder}" : "App\\Services";
        $requestNamespace = $subFolder ? "App\\Http\\Requests\\{$subFolder}" : "App\\Http\\Requests";
        
        $controllerDirectory = $subFolder ? app_path("Http/Controllers/{$subFolder}") : app_path('Http/Controllers');
    
        if (!file_exists($controllerDirectory)) {
            mkdir($controllerDirectory, 0755, true);
        }
    
        $controllerPath = "{$controllerDirectory}/{$modelName}Controller.php";
    
        $controllerStub = $this->getStub('InertiaController');
        $controllerContent = str_replace(
            [
                '{{namespace}}', 
                '{{model}}', 
                '{{serviceNamespace}}',
                '{{requestNamespace}}',
                '{{modelPlural}}',
                '{{modelKebab}}'
            ],
            [
                $namespace, 
                $modelName, 
                $serviceNamespace,
                $requestNamespace,
                Str::plural($modelName),
                Str::kebab($modelName)
            ],
            $controllerStub
        );
        file_put_contents($controllerPath, $controllerContent);
    
        $this->info("Inertia Controller for {$modelName} created successfully.");
    }

    protected function createInertiaReactComponents($modelName, $subFolder = null)
    {
        $componentPath = $subFolder ? "{$subFolder}/{$modelName}" : $modelName;
        $baseDirectory = resource_path("js/Pages/{$componentPath}");

        if (!file_exists($baseDirectory)) {
            mkdir($baseDirectory, 0755, true);
        }

        $components = ['Index', 'Create', 'Edit', 'Show', '_Form'];
        
        foreach ($components as $component) {
            $stubName = "Inertia.React.{$component}";
            $fileName = "{$component}.tsx";
            $filePath = "{$baseDirectory}/{$fileName}";

            $stub = $this->getStub($stubName);
            $content = str_replace(
                ['{{model}}', '{{modelPlural}}', '{{modelKebab}}'],
                [$modelName, Str::plural($modelName), Str::kebab($modelName)],
                $stub
            );
            file_put_contents($filePath, $content);
        }

        $this->info("Inertia React components for {$modelName} created successfully.");
    }

    protected function createInertiaVueComponents($modelName, $subFolder = null)
    {
        $componentPath = $subFolder ? "{$subFolder}/{$modelName}" : $modelName;
        $baseDirectory = resource_path("js/Pages/{$componentPath}");

        if (!file_exists($baseDirectory)) {
            mkdir($baseDirectory, 0755, true);
        }

        $components = ['Index', 'Create', 'Edit', 'Show', '_Form'];
        
        foreach ($components as $component) {
            $stubName = "Inertia.Vue.{$component}";
            $fileName = "{$component}.vue";
            $filePath = "{$baseDirectory}/{$fileName}";

            $stub = $this->getStub($stubName);
            $content = str_replace(
                ['{{model}}', '{{modelPlural}}', '{{modelKebab}}'],
                [$modelName, Str::plural($modelName), Str::kebab($modelName)],
                $stub
            );
            file_put_contents($filePath, $content);
        }

        $this->info("Inertia Vue components for {$modelName} created successfully.");
    }

    protected function getStub($type)
    {
        return file_get_contents(resource_path("stubs/{$type}.stub"));
    }
}