Rails.application.config.active_storage.resolve_model_to_route = :rails_storage_proxy
Rails.application.config.active_storage.variant_processor = :vips
Rails.application.routes.default_url_options[:host] = ENV.fetch('HOST')