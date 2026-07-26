package com.voltcontrol.ibm.config;

import javax.sql.DataSource;

import org.jobrunr.dashboard.JobRunrDashboardWebServer;
import org.jobrunr.jobs.mappers.JobMapper;
import org.jobrunr.server.BackgroundJobServer;
import org.jobrunr.server.JobActivator;
import org.jobrunr.scheduling.JobScheduler;
import org.jobrunr.storage.StorageProvider;
import org.jobrunr.storage.sql.common.SqlStorageProviderFactory;
import org.jobrunr.utils.mapper.jackson.JacksonJsonMapper;
import org.jobrunr.utils.mapper.JsonMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JobRunrConfig {

    @Bean
    public JsonMapper jsonMapper() {
        return new JacksonJsonMapper(new com.fasterxml.jackson.databind.ObjectMapper());
    }

    @Bean
    public JobMapper jobMapper(JsonMapper jsonMapper) {
        return new JobMapper(jsonMapper);
    }

    @Bean
    public StorageProvider storageProvider(DataSource dataSource, JobMapper jobMapper) {
        StorageProvider storageProvider = SqlStorageProviderFactory.using(dataSource);
        storageProvider.setJobMapper(jobMapper);
        return storageProvider;
    }

    @Bean
    public JobActivator jobActivator(ApplicationContext applicationContext) {
        return new JobActivator() {
            @Override
            public <T> T activateJob(Class<T> type) {
                return applicationContext.getBean(type);
            }
        };
    }

    @Bean(initMethod = "start", destroyMethod = "stop")
    public BackgroundJobServer backgroundJobServer(StorageProvider storageProvider, JsonMapper jsonMapper, JobActivator jobActivator) {
        return new BackgroundJobServer(storageProvider, jsonMapper, jobActivator);
    }

    @Bean
    public JobScheduler jobScheduler(StorageProvider storageProvider) {
        JobScheduler jobScheduler = new JobScheduler(storageProvider);
        org.jobrunr.scheduling.BackgroundJob.setJobScheduler(jobScheduler);
        return jobScheduler;
    }

    @Bean(initMethod = "start", destroyMethod = "stop")
    public JobRunrDashboardWebServer dashboardWebServer(StorageProvider storageProvider, JsonMapper jsonMapper) {
        return new JobRunrDashboardWebServer(storageProvider, jsonMapper, 8000);
    }
}
